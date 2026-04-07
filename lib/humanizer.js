function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

// ============================================================
// HUMANO-STYLE: Minimal changes, add human filler words
// This is what actually bypasses detectors
// ============================================================

// Phase 1: Add human filler words at sentence starts
const FILLER_INSERTIONS = [
  { pattern: /^It is important to note that\s+/i, replacements: ["Don't forget ", "Keep in mind ", "Remember that "] },
  { pattern: /^It's important to note that\s+/i, replacements: ["Don't forget ", "Keep in mind ", "Remember that "] },
  { pattern: /^Furthermore,?\s*/i, replacements: ["Interestingly, also, ", "What's more, ", "On top of that, "] },
  { pattern: /^However,?\s*/i, replacements: ["Still, ", "That said, ", "Even so, "] },
  { pattern: /^Moreover,?\s*/i, replacements: ["What's more, ", "Additionally, ", "Plus, "] },
  { pattern: /^In addition,?\s*/i, replacements: ["Plus, ", "On top of that, ", "Also, "] },
  { pattern: /^Additionally,?\s*/i, replacements: ["What's more, ", "Plus, ", "Also, "] },
  { pattern: /^Consequently,?\s*/i, replacements: ["So then, ", "As a result, ", "Because of that, "] },
  { pattern: /^Therefore,?\s*/i, replacements: ["So then, ", "Because of that, ", "As a result, "] },
  { pattern: /^In conclusion,?\s*/i, replacements: ["So basically, ", "All in all, ", "To sum it up, "] },
  { pattern: /^In summary,?\s*/i, replacements: ["So basically, ", "All in all, ", "To wrap up, "] },
  { pattern: /^Nevertheless,?\s*/i, replacements: ["Still, ", "Even so, ", "That said, "] },
  { pattern: /^In order to\s+/i, replacements: ["To "] },
  { pattern: /^It is essential to\s+/i, replacements: ["It's crucial to ", "We really need to "] },
  { pattern: /^It is crucial to\s+/i, replacements: ["It's essential to ", "We really need to "] },
  { pattern: /^It is necessary to\s+/i, replacements: ["We need to ", "It's important to "] },
]

// Phase 2: Minimal word swaps (Humano style - very few)
const MINIMAL_WORD_SWAPS = [
  { f: /\bcomprehensive\b/gi, r: () => pick(['full', 'complete', 'thorough']) },
  { f: /\brobust\b/gi, r: () => pick(['strong', 'solid', 'reliable']) },
  { f: /\bleverage\b/gi, r: () => pick(['use', 'make use of']) },
  { f: /\butilize\b/gi, r: () => pick(['use']) },
  { f: /\btransformative\b/gi, r: () => pick(['major', 'significant']) },
  { f: /\binnovative\b/gi, r: () => pick(['new', 'creative']) },
  { f: /\bseamless\b/gi, r: () => pick(['smooth', 'easy']) },
  { f: /\bholistic\b/gi, r: () => pick(['complete', 'full']) },
  { f: /\bnuanced\b/gi, r: () => pick(['detailed', 'subtle']) },
  { f: /\bmyriad\b/gi, r: () => pick(['many', 'lots of']) },
  { f: /\bplethora\b/gi, r: () => pick(['lot', 'bunch']) },
  { f: /\bcrucial importance\b/gi, r: () => 'importance' },
  { f: /\bcrucial\b/gi, r: () => pick(['important', 'key']) },
  { f: /\bpivotal\b/gi, r: () => pick(['key', 'important']) },
  { f: /\bstreamline\b/gi, r: () => pick(['simplify', 'speed up']) },
  { f: /\boptimize\b/gi, r: () => pick(['improve', 'make better']) },
  { f: /\benhance\b/gi, r: () => pick(['improve', 'boost']) },
  { f: /\benhances\b/gi, r: () => pick(['improves', 'boosts']) },
  { f: /\bempower\b/gi, r: () => pick(['enable', 'help']) },
  { f: /\bensure\b/gi, r: () => pick(['make sure']) },
  { f: /\bfacilitate\b/gi, r: () => pick(['help', 'support']) },
  { f: /\bsynergy\b/gi, r: () => pick(['teamwork', 'combined effort']) },
  { f: /\bsynergistic\b/gi, r: () => pick(['combined', 'joint']) },
  { f: /\bimpactful\b/gi, r: () => pick(['effective', 'meaningful']) },
  { f: /\bactionable\b/gi, r: () => pick(['useful', 'practical']) },
  { f: /\bdelve\b/gi, r: () => pick(['look into', 'dig into']) },
  { f: /\bbustling\b/gi, r: () => pick(['busy', 'active']) },
  { f: /\bvibrant\b/gi, r: () => pick(['lively', 'energetic']) },
  { f: /\bdynamic\b/gi, r: () => pick(['active', 'changing']) },
  { f: /\brapidly evolving\b/gi, r: () => pick(['fast-changing', 'quickly changing']) },
  { f: /\bever-changing\b/gi, r: () => pick(['always changing', 'constantly shifting']) },
  { f: /\bconstantly evolving\b/gi, r: () => pick(['always changing', 'always shifting']) },
  { f: /\bacross the globe\b/gi, r: () => pick(['worldwide', 'around the world']) },
  { f: /\baround the world\b/gi, r: () => pick(['worldwide', 'everywhere']) },
  { f: /\bin the realm of\b/gi, r: () => pick(['in']) },
  { f: /\bin the field of\b/gi, r: () => pick(['in']) },
  { f: /\bthereby\b/gi, r: () => pick(['which', 'and so']) },
  { f: /\bwhereby\b/gi, r: () => pick(['where']) },
  { f: /\bat the end of the day\b/gi, r: () => pick(['ultimately', 'in the end']) },
  { f: /\bwhen all is said and done\b/gi, r: () => pick(['in the end', 'ultimately']) },
  { f: /\bneedless to say\b/gi, r: () => pick(['obviously', 'clearly']) },
  { f: /\bgreat question\b/gi, r: () => '' },
  { f: /\bcertainly\b/gi, r: () => '' },
  { f: /\bof course\b/gi, r: () => '' },
  { f: /\babsolutely\b/gi, r: () => '' },
  { f: /\bi hope this helps\b/gi, r: () => '' },
  { f: /\bfeel free to let me know\b/gi, r: () => '' },
  { f: /\blet me know if you'd like\b/gi, r: () => '' },
  { f: /\blet's dive in\b/gi, r: () => '' },
  { f: /\blet's explore\b/gi, r: () => '' },
  { f: /\bwithout further ado\b/gi, r: () => '' },
  { f: /\bhere's what you need to know\b/gi, r: () => '' },
  { f: /\bin this article,? we will\b/gi, r: () => '' },
  { f: /\bas mentioned earlier\b/gi, r: () => '' },
  { f: /\bas previously stated\b/gi, r: () => '' },
]

// Phase 3: Remove fake depth patterns (Humano removes these)
const FAKE_DEPTH = [
  /,\s*highlighting\s+(?:that\s+)?[^.,]+/gi,
  /,\s*underscoring\s+the\s+importance\s+of\s+[^.,]+/gi,
  /,\s*symbolizing\s+[^.,]+/gi,
  /,\s*representing\s+[^.,]+/gi,
  /,\s*reflecting\s+broader\s+[^.,]+/gi,
  /,\s*contributing\s+to\s+[^.,]+/gi,
  /,\s*fostering\s+[^.,]+/gi,
  /,\s*cultivating\s+[^.,]+/gi,
  /,\s*encompassing\s+[^.,]+/gi,
  /,\s*showcasing\s+[^.,]+/gi,
  /,\s*demonstrating\s+the\s+[^.,]+/gi,
  /,\s*paving the way for\s+[^.,]+/gi,
  /,\s*opening doors for\s+[^.,]+/gi,
  /,\s*setting the stage for\s+[^.,]+/gi,
]

// Phase 4: Contractions (Humano applies these)
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

// Phase 5: Add natural imperfections (Humano adds "um", "you know", etc.)
function addImperfections(sentences, strength) {
  const count = strength === 'aggressive' ? Math.max(1, Math.floor(sentences.length / 3)) :
                strength === 'medium' ? Math.max(1, Math.floor(sentences.length / 5)) :
                0

  if (count === 0) return sentences

  const imperfections = [
    ' um,',
    ', you know,',
    ', I mean,',
    ', honestly,',
    ', basically,',
    ', well,',
  ]

  const out = [...sentences]
  const positions = []
  for (let i = 0; i < out.length; i++) {
    const words = out[i].split(/\s+/)
    if (words.length > 10) {
      positions.push({ idx: i, pos: Math.min(4, Math.floor(words.length / 4)) })
    }
  }

  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[positions[i], positions[j]] = [positions[j], positions[i]]
  }

  const selected = positions.slice(0, Math.min(count, positions.length))
  for (const { idx, pos } of selected) {
    const words = out[idx].split(/\s+/)
    words.splice(pos, 0, pick(imperfections))
    out[idx] = words.join(' ')
  }

  return out
}

// Phase 6: Add short reaction sentences (Humano adds "Exactly.", "Don't forget", etc.)
function addReactions(sentences, strength) {
  const out = [...sentences]
  const count = strength === 'aggressive' ? Math.max(1, Math.floor(sentences.length / 3)) :
                strength === 'medium' ? Math.max(1, Math.floor(sentences.length / 4)) :
                0

  if (count === 0) return out

  const reactions = [
    'Exactly.',
    'Don\'t forget.',
    'Keep in mind.',
    'Think about it.',
    'It\'s true.',
    'No surprise there.',
    'Makes sense, right?',
    'That\'s the thing.',
    'Here\'s the thing.',
    'It\'s worth noting.',
  ]

  const positions = []
  for (let i = 0; i < out.length - 1; i++) {
    positions.push(i + 1)
  }

  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[positions[i], positions[j]] = [positions[j], positions[i]]
  }

  const selected = positions.slice(0, Math.min(count, positions.length)).sort((a, b) => b - a)
  for (const pos of selected) {
    out.splice(pos, 0, pick(reactions))
  }

  return out
}

// ============================================================
// MAIN PIPELINE - Humano style
// ============================================================
const MODES = {
  light:     { fillers: true, words: true, fakeDepth: false, contractions: false, imperfections: false, reactions: false },
  medium:    { fillers: true, words: true, fakeDepth: true, contractions: true, imperfections: false, reactions: true },
  aggressive:{ fillers: true, words: true, fakeDepth: true, contractions: true, imperfections: true, reactions: true },
}

export function humanize(text, strength = 'medium') {
  if (!text || !text.trim()) return { text: '', stats: { changes: 0 } }

  const cfg = MODES[strength]
  let changes = 0

  // Phase 1: Split into sentences first
  let sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim())

  // Phase 2: Apply filler replacements per sentence
  if (cfg.fillers) {
    sentences = sentences.map(s => {
      for (const { pattern, replacements } of FILLER_INSERTIONS) {
        // Use ^ to match start of each sentence
        const sentencePattern = new RegExp(pattern.source, pattern.flags.includes('i') ? 'i' : '')
        const m = s.match(sentencePattern)
        if (m) { changes++; return s.replace(sentencePattern, pick(replacements)) }
      }
      return s
    })
  }

  // Phase 3: Word swaps
  if (cfg.words) {
    sentences = sentences.map(s => {
      for (const { f, r } of MINIMAL_WORD_SWAPS) {
        const m = s.match(f)
        if (m) { changes++; s = s.replace(f, typeof r === 'function' ? r() : r) }
      }
      return s
    })
  }

  // Phase 4: Remove fake depth patterns
  if (cfg.fakeDepth) {
    sentences = sentences.map(s => {
      for (const p of FAKE_DEPTH) {
        const m = s.match(p)
        if (m && m[0].length < 20) {
          changes++
          s = s.replace(p, '').trim()
          if (!s.match(/[.!?]$/)) s += '.'
        }
      }
      return s
    })
  }

  // Phase 5: Contractions
  if (cfg.contractions) {
    sentences = sentences.map(s => {
      for (const [f, r] of CONTRACTIONS) {
        if (f.test(s)) { changes++; s = s.replace(f, r) }
      }
      return s
    })
  }

  // Phase 6: Add natural imperfections (fixed)
  if (cfg.imperfections) {
    sentences = addImperfections(sentences, strength)
  }

  // Phase 7: Add reaction sentences
  if (cfg.reactions) {
    sentences = addReactions(sentences, strength)
  }

  // Rebuild
  let result = sentences.join(' ')

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
