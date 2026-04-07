function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

// ============================================================
// HUMANIZER v10 - Based on Humano architecture but safe
// Context-aware pattern removal + word swaps + contractions + rhythm
// NO sentence restructuring that breaks grammar
// ============================================================

class HumanizerService {
  constructor() {
    // AI patterns with context-aware replacements (from Humano)
    // Only match at sentence start (after period or at text start)
    this.aiPatterns = {
      '(?:^|[.!?]\\s*)\\bIn conclusion,?\\s*': ["So basically, ", "Bottom line - ", "To wrap up, ", "All in all, "],
      '(?:^|[.!?]\\s*)\\bFurthermore,?\\s*': ["Plus, ", "Also, ", "And, ", "What's more, "],
      '(?:^|[.!?]\\s*)\\bHowever,?\\s*': ["But, ", "Though, ", "Still, "],
      '(?:^|[.!?]\\s*)\\bIt is important to note that\\s*': ["Keep in mind ", "Remember ", "Don't forget "],
      '(?:^|[.!?]\\s*)\\bMoreover,?\\s*': ["Plus, ", "Also, ", "What's more, "],
      '(?:^|[.!?]\\s*)\\bAdditionally,?\\s*': ["Plus, ", "Also, ", "And, "],
      '(?:^|[.!?]\\s*)\\bConsequently,?\\s*': ["So then, ", "As a result, "],
      '(?:^|[.!?]\\s*)\\bTherefore,?\\s*': ["So then, ", "So, "],
      '(?:^|[.!?]\\s*)\\bNevertheless,?\\s*': ["Still, ", "Even so, "],
      '(?:^|[.!?]\\s*)\\bIn order to\\s*': ["To "],
      '(?:^|[.!?]\\s*)\\bIt is essential to\\s*': ["It's crucial to ", "We really need to "],
      '(?:^|[.!?]\\s*)\\bIt is crucial to\\s*': ["It's essential to ", "We really need to "],
      '(?:^|[.!?]\\s*)\\bIt is necessary to\\s*': ["We need to ", "It's important to "],
    }

    // Context-sensitive word replacements (from Humano)
    this.contextualReplacements = {
      academic: {
        "utilize": ["use", "work with"],
        "demonstrate": ["show", "prove"],
        "subsequently": ["then", "next"],
        "methodology": ["method", "approach"],
        "facilitate": ["help", "make easier"],
        "comprehensive": ["complete", "thorough"],
        "implement": ["put in place", "use"],
        "substantial": ["significant", "major"],
      },
      business: {
        "leverage": ["use", "take advantage of"],
        "optimize": ["improve", "make better"],
        "streamline": ["simplify", "make easier"],
        "utilize": ["use", "work with"],
        "actionable": ["practical", "useful"],
      },
      technical: {
        "parameters": ["settings", "options"],
        "configuration": ["setup", "arrangement"],
        "implementation": ["setup", "making it work"],
        "architecture": ["structure", "design"],
        "framework": ["structure", "foundation"],
      }
    }

    // General word swaps for all contexts
    this.generalWordSwaps = {
      "robust": ["strong", "solid"],
      "seamless": ["smooth", "easy"],
      "holistic": ["complete", "full"],
      "nuanced": ["detailed", "subtle"],
      "myriad": ["many", "lots of"],
      "plethora": ["lot", "bunch"],
      "crucial": ["important", "key"],
      "pivotal": ["key", "important"],
      "streamline": ["simplify", "speed up"],
      "optimize": ["improve", "make better"],
      "enhance": ["improve", "boost"],
      "enhances": ["improves", "boosts"],
      "empower": ["enable", "help"],
      "ensure": ["make sure"],
      "facilitate": ["help", "support"],
      "synergy": ["teamwork"],
      "synergistic": ["combined"],
      "impactful": ["effective"],
      "actionable": ["useful"],
      "delve": ["look into"],
      "rapidly evolving": ["fast-changing"],
      "ever-changing": ["always changing"],
      "constantly evolving": ["always changing"],
      "in today's world": ["today"],
      "in the modern era": ["now"],
      "across the globe": ["worldwide"],
      "around the world": ["worldwide"],
      "in the realm of": ["in"],
      "in the field of": ["in"],
      "thereby": ["which"],
      "whereby": ["where"],
      "at the end of the day": ["ultimately"],
      "when all is said and done": ["in the end"],
      "needless to say": ["obviously"],
      "serves as": ["is"],
      "stands as": ["is"],
      "functions as": ["is"],
      "acts as": ["is"],
      "navigate": ["handle"],
      "navigating": ["handling"],
      "landscape": ["field"],
      "ecosystem": ["space"],
    }

    // Smart contractions (from Humano)
    this.smartContractions = {
      '\\bdo not\\b': "don't",
      '\\bwill not\\b': "won't",
      '\\bcannot\\b': "can't",
      '\\byou are\\b': "you're",
      '\\bwe are\\b': "we're",
      '\\bthey are\\b': "they're",
      '\\bit is\\b': "it's",
      '\\bthat is\\b': "that's",
      '\\bis not\\b': "isn't",
      '\\bare not\\b': "aren't",
      '\\bwas not\\b': "wasn't",
      '\\bwere not\\b': "weren't",
      '\\bhas not\\b': "hasn't",
      '\\bhave not\\b': "haven't",
      '\\bhad not\\b': "hadn't",
      '\\bwould not\\b': "wouldn't",
      '\\bcould not\\b': "couldn't",
      '\\bshould not\\b': "shouldn't",
      '\\bI am\\b': "I'm",
      '\\bhe is\\b': "he's",
      '\\bshe is\\b': "she's",
      '\\bdoes not\\b': "doesn't",
      '\\bdid not\\b': "didn't",
    }

    // Rhythm patterns (from Humano) - used as standalone sentences between existing ones
    this.rhythmPatterns = {
      shortPunch: ["Exactly.", "True.", "Bingo.", "Right?", "Makes sense.", "Obviously.", "No surprise there.", "It's true.", "Here's the thing.", "Think about it.", "That's the thing.", "Keep in mind.", "Don't forget.", "It's worth noting.", "Remember that.", "Of course.", "Naturally.", "Clearly.", "Interestingly.", "Honestly.", "Frankly.", "Basically."],
      mediumBridge: [
        "But here's where it gets interesting:",
        "Now, here's the key point:",
        "And this is where things get tricky:",
        "Here's what I mean by that:"
      ],
    }
  }

  // ============================================================
  // MAIN PIPELINE
  // ============================================================
  humanize(content, strength = 'medium') {
    if (!content || content.trim().length < 20) {
      return { text: '', stats: { changes: 0 } }
    }

    let humanized = content
    const context = this.analyzeContext(humanized)
    let changes = 0

    // Phase 1: Core transformations (all levels)
    const result1 = this.patternRemoval(humanized, context)
    humanized = result1.text
    changes += result1.changes

    const result2 = this.contextualWordReplacement(humanized, context)
    humanized = result2.text
    changes += result2.changes

    const result3 = this.applyContractions(humanized, context)
    humanized = result3.text
    changes += result3.changes

    // Phase 2: Structural improvements (medium+)
    if (strength === 'medium' || strength === 'high') {
      humanized = this.enhanceFlowAndRhythm(humanized, strength)
    }

    // Phase 3: Advanced techniques (high only)
    if (strength === 'high') {
      humanized = this.advancedBurstiness(humanized)
    }

    // Final polish
    humanized = this.finalPolish(humanized)

    return {
      text: humanized,
      stats: {
        changes,
        originalWords: content.trim().split(/\s+/).length,
        humanizedWords: humanized.trim().split(/\s+/).length,
      }
    }
  }

  // ============================================================
  // Context Analysis (from Humano)
  // ============================================================
  analyzeContext(text) {
    const academicIndicators = ['research', 'study', 'analysis', 'methodology', 'framework', 'hypothesis']
    const businessIndicators = ['strategy', 'leverage', 'synergy', 'optimize', 'stakeholder', 'ROI']
    const technicalIndicators = ['system', 'implementation', 'configuration', 'architecture', 'parameters']

    const textLower = text.toLowerCase()
    const wordCount = text.split(/\s+/).length

    const academicScore = academicIndicators.reduce((sum, w) => sum + (textLower.match(new RegExp(w, 'g')) || []).length, 0) / wordCount
    const businessScore = businessIndicators.reduce((sum, w) => sum + (textLower.match(new RegExp(w, 'g')) || []).length, 0) / wordCount
    const technicalScore = technicalIndicators.reduce((sum, w) => sum + (textLower.match(new RegExp(w, 'g')) || []).length, 0) / wordCount

    return {
      academic: Math.min(academicScore * 100, 1.0),
      business: Math.min(businessScore * 100, 1.0),
      technical: Math.min(technicalScore * 100, 1.0),
      formality: this.calculateFormalityScore(text)
    }
  }

  calculateFormalityScore(text) {
    const formalPatterns = [
      /\b(furthermore|moreover|additionally|consequently|therefore)\b/gi,
      /\b(utilize|implement|demonstrate|facilitate)\b/gi,
      /\b(it is important to note|it should be noted|as aforementioned)\b/gi
    ]

    let formalCount = 0
    formalPatterns.forEach(p => {
      const matches = text.match(p)
      if (matches) formalCount += matches.length
    })

    const sentences = text.split(/[.!?]+/).filter(s => s.trim())
    const avgSentenceLength = sentences.reduce((sum, s) => sum + s.split(/\s+/).length, 0) / Math.max(sentences.length, 1)

    return Math.min((formalCount * 0.1 + avgSentenceLength * 0.05), 1.0)
  }

  // ============================================================
  // PHASE 1: Pattern Removal
  // ============================================================
  patternRemoval(text, context) {
    let changes = 0

    for (const [patternStr, replacements] of Object.entries(this.aiPatterns)) {
      const pattern = new RegExp(patternStr, 'gi')
      if (pattern.test(text)) {
        const replacement = pick(replacements)
        text = text.replace(pattern, replacement)
        changes++
      }
    }

    // Also apply general word swaps
    for (const [word, alternatives] of Object.entries(this.generalWordSwaps)) {
      const pattern = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
      if (pattern.test(text)) {
        text = text.replace(pattern, pick(alternatives))
        changes++
      }
    }

    return { text, changes }
  }

  // ============================================================
  // PHASE 1: Contextual Word Replacement (from Humano)
  // ============================================================
  contextualWordReplacement(text, context) {
    let changes = 0

    // Determine primary context
    const contexts = ['academic', 'business', 'technical']
    const primaryContext = contexts.reduce((a, b) => context[a] > context[b] ? a : b, contexts[0])

    if (this.contextualReplacements[primaryContext]) {
      for (const [word, alternatives] of Object.entries(this.contextualReplacements[primaryContext])) {
        const pattern = new RegExp(`\\b${word}\\b`, 'gi')
        if (pattern.test(text) && Math.random() < 0.6) {
          text = text.replace(pattern, pick(alternatives))
          changes++
        }
      }
    }

    return { text, changes }
  }

  // ============================================================
  // PHASE 1: Smart Contractions (from Humano)
  // ============================================================
  applyContractions(text, context) {
    let changes = 0
    const probability = context && context.formality < 0.4 ? 0.8 : 0.5

    for (const [patternStr, contraction] of Object.entries(this.smartContractions)) {
      const pattern = new RegExp(patternStr, 'gi')
      if (pattern.test(text) && Math.random() < probability) {
        text = text.replace(pattern, contraction)
        changes++
      }
    }

    return { text, changes }
  }

  // ============================================================
  // PHASE 2: Enhance Flow and Rhythm (from Humano - safe version)
  // Only adds standalone reaction phrases, never modifies existing sentences
  // ============================================================
  enhanceFlowAndRhythm(text, strength) {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim())
    const enhanced = []

    // Words that shouldn't have bridges inserted before them
    const noBridgeBefore = /^(and|but|or|so|yet|for|nor|however|therefore|moreover|furthermore|additionally|consequently|nevertheless|meanwhile|otherwise|still|though|although|even so|that said|on the other hand|in any case|at any rate|in fact|indeed|of course|naturally|obviously|clearly|apparently|evidently|undoubtedly|certainly|surely|absolutely|definitely|positively|unquestionably|undoubtedly|without doubt|no doubt)/i

    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i]
      if (!sentence.trim()) continue

      const wordCount = sentence.split(/\s+/).length

      // Add short punch after long sentence (from Humano)
      if (wordCount > 15 && Math.random() < 0.15) {
        enhanced.push(sentence)
        enhanced.push(pick(this.rhythmPatterns.shortPunch))
      }
      // Add bridge before short sentence - but only if it doesn't start with a conjunction
      else if (wordCount < 8 && i < sentences.length - 1 && Math.random() < 0.12 && !noBridgeBefore.test(sentence.trim())) {
        enhanced.push(pick(this.rhythmPatterns.mediumBridge))
        enhanced.push(sentence)
      } else {
        enhanced.push(sentence)
      }
    }

    return enhanced.join(' ')
  }

  // ============================================================
  // PHASE 3: Advanced Burstiness (from Humano - safe version)
  // Only splits very long sentences, never restructures
  // ============================================================
  advancedBurstiness(text) {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim())
    const lengths = sentences.map(s => s.split(/\s+/).length)
    if (!lengths.length) return text

    const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length
    const variation = Math.max(...lengths) - Math.min(...lengths)

    // If not enough variation, inject some by splitting very long sentences
    if (variation < 12) {
      const modified = []
      for (const sentence of sentences) {
        const words = sentence.split(/\s+/)
        // Only split at semicolons or ", but" - safe split points
        if (words.length > avgLength * 1.5 && Math.random() < 0.3) {
          if (sentence.includes(';')) {
            const parts = sentence.split(/\s*;\s*/)
            for (let i = 0; i < parts.length; i++) {
              let p = parts[i].trim()
              if (!p) continue
              if (i > 0 && /^[a-z]/.test(p)) p = p.charAt(0).toUpperCase() + p.slice(1)
              if (!p.match(/[.!?]$/)) p += '.'
              modified.push(p)
            }
          } else {
            modified.push(sentence)
          }
        } else {
          modified.push(sentence)
        }
      }
      return modified.join(' ')
    }

    return text
  }

  // ============================================================
  // Final Polish (from Humano)
  // ============================================================
  finalPolish(text) {
    text = text.replace(/\s+/g, ' ')
    text = text.replace(/\s+([.!?,:;])/g, '$1')
    text = text.replace(/([.!?])\s*([A-Z])/g, '$1 $2')

    const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim())
    const polished = sentences.map(s => {
      s = s.trim()
      if (s && s[0] && s[0].toLowerCase() === s[0]) {
        s = s.charAt(0).toUpperCase() + s.slice(1)
      }
      return s
    })

    return polished.join(' ').trim()
  }
}

// ============================================================
// EXPORT
// ============================================================
const service = new HumanizerService()

export function humanize(text, strength = 'medium') {
  return service.humanize(text, strength)
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
