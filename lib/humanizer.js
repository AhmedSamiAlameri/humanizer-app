function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

// ============================================================
// HUMANIZER v8 - ONLY reaction phrases + contractions
// No word swaps - they break grammar
// ============================================================

const REACTIONS = [
  "Keep in mind.",
  "No surprise there.",
  "It's true.",
  "Here's the thing.",
  "Think about it.",
  "That's the thing.",
  "Exactly.",
  "Don't forget.",
  "Makes sense, right?",
  "It's worth noting.",
  "Remember that.",
  "Of course.",
  "Naturally.",
  "Obviously.",
  "Clearly.",
  "Interestingly.",
  "Surprisingly.",
  "Honestly.",
  "Frankly.",
  "Basically.",
]

const CONTRACTIONS = [
  [/\bis not\b/gi, "isn't"], [/\bare not\b/gi, "aren't"], [/\bwas not\b/gi, "wasn't"],
  [/\bwere not\b/gi, "weren't"], [/\bhas not\b/gi, "hasn't"], [/\bhave not\b/gi, "haven't"],
  [/\bhad not\b/gi, "hadn't"], [/\bwill not\b/gi, "won't"], [/\bwould not\b/gi, "wouldn't"],
  [/\bcould not\b/gi, "couldn't"], [/\bshould not\b/gi, "shouldn't"], [/\bcannot\b/gi, "can't"],
  [/\bit is\b/gi, "it's"], [/\bthat is\b/gi, "that's"], [/\bthere is\b/gi, "there's"],
  [/\bthey are\b/gi, "they're"], [/\bwe are\b/gi, "we're"], [/\byou are\b/gi, "you're"],
  [/\bI am\b/gi, "I'm"], [/\bhe is\b/gi, "he's"], [/\bshe is\b/gi, "she's"],
  [/\bdo not\b/gi, "don't"], [/\bdoes not\b/gi, "doesn't"], [/\bdid not\b/gi, "didn't"],
]

const MODES = {
  light:     { reactions: false, contractions: true },
  medium:    { reactions: true, contractions: true },
  aggressive:{ reactions: true, contractions: true },
}

export function humanize(text, strength = 'medium') {
  if (!text || !text.trim()) return { text: '', stats: { changes: 0 } }

  const cfg = MODES[strength]
  let changes = 0
  let result = text

  // Phase 1: Contractions
  if (cfg.contractions) {
    for (const [f, r] of CONTRACTIONS) {
      if (f.test(result)) {
        const count = (result.match(f) || []).length
        changes += count
        result = result.replace(f, r)
      }
    }
  }

  // Phase 2: Add reaction phrases between sentences
  if (cfg.reactions) {
    const sentences = result.split(/(?<=[.!?])\s+/).filter(s => s.trim())
    const out = []
    const reactionCount = strength === 'aggressive' ? Math.max(1, Math.floor(sentences.length / 3)) :
                          Math.max(1, Math.floor(sentences.length / 5))

    const positions = new Set()
    while (positions.size < Math.min(reactionCount, sentences.length - 1)) {
      positions.add(Math.floor(Math.random() * (sentences.length - 1)) + 1)
    }

    for (let i = 0; i < sentences.length; i++) {
      out.push(sentences[i])
      if (positions.has(i + 1)) {
        out.push(pick(REACTIONS))
      }
    }

    result = out.join(' ')
  }

  // Cleanup
  result = result.replace(/\s{2,}/g, ' ')
  result = result.replace(/,\s*,/g, ',')
  result = result.replace(/,\s*\./g, '.')
  result = result.replace(/\s+\./g, '.')
  result = result.replace(/\.\s+\./g, '.')
  result = result.replace(/\(\s*\)/g, '')
  result = result.replace(/(^|\.\s+)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase())
  result = result.replace(/^\s*[,.;:\s]+/gm, '')
  result = result.replace(/\n{3,}/g, '\n\n')
  result = result.trim()

  return {
    text: result,
    stats: {
      changes,
      originalWords: text.trim().split(/\s+/).length,
      humanizedWords: result.trim().split(/\s+/).length,
    }
  }
}

export function getHumanizationStats(original, humanized) {
  const ow = original.trim().split(/\s+/).length
  const hw = humanized.trim().split(/\s+/).length
  const sents = humanized.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const words = humanized.trim().split(/\s+/)
  const avg = words.length / Math.max(sents.length, 1)

  let read = 'Moderate'
  if (avg < 12) read = 'Very Easy'
  else if (avg < 16) read = 'Easy'
  else if (avg < 20) read = 'Moderate'
  else if (avg < 25) read = 'Challenging'
  else read = 'Difficult'

  let burst = 'N/A'
  if (sents.length >= 3) {
    const lens = sents.map(s => s.trim().split(/\s+/).length)
    const a = lens.reduce((x, y) => x + y, 0) / lens.length
    const v = lens.reduce((s, l) => s + Math.pow(l - a, 2), 0) / lens.length
    const cv = a > 0 ? Math.sqrt(v) / a : 0
    if (cv > 0.5) burst = 'High (Human)'
    else if (cv > 0.3) burst = 'Moderate'
    else burst = 'Low (AI-like)'
  }

  return {
    originalWords: ow, humanizedWords: hw, wordChange: hw - ow,
    percentChange: ow > 0 ? (((hw - ow) / ow) * 100).toFixed(1) : 0,
    readabilityScore: read, burstinessScore: burst,
  }
}
