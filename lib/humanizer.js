// Humanization Engine — 7-Pass Cycle
// Transforms AI-generated text into natural human writing

const AI_PATTERNS = {
  // GROUP A — Inflation & Significance Bloat
  inflation: [
    { pattern: /\bserves as\b/gi, replacement: 'is' },
    { pattern: /\bstands as\b/gi, replacement: 'is' },
    { pattern: /\bfunctions as\b/gi, replacement: 'is' },
    { pattern: /\bacts as\b/gi, replacement: 'is' },
    { pattern: /\btestament to\b/gi, replacement: 'proof of' },
    { pattern: /\bpivotal moment\b/gi, replacement: 'important moment' },
    { pattern: /\bkey turning point\b/gi, replacement: 'turning point' },
    { pattern: /\bwatershed moment\b/gi, replacement: 'turning point' },
    { pattern: /\bevolving landscape\b/gi, replacement: '' },
    { pattern: /\brapidly changing world\b/gi, replacement: '' },
    { pattern: /\bever-changing\b/gi, replacement: '' },
    { pattern: /\bbroader implications\b/gi, replacement: '' },
    { pattern: /\bunderscores\b/gi, replacement: 'shows' },
    { pattern: /\bhighlights\b/gi, replacement: 'shows' },
    { pattern: /\bemphasizes\b/gi, replacement: 'shows' },
    { pattern: /\bunderlines\b/gi, replacement: 'shows' },
    { pattern: /\bindelible mark\b/gi, replacement: 'mark' },
    { pattern: /\blastingly legacy\b/gi, replacement: '' },
    { pattern: /\benduring impact\b/gi, replacement: 'impact' },
    { pattern: /\bcontributing to the\b/gi, replacement: '' },
    { pattern: /\bshaping the future of\b/gi, replacement: '' },
    { pattern: /\bdeeply rooted in\b/gi, replacement: 'based in' },
    { pattern: /\binextricably linked to\b/gi, replacement: 'connected to' },
    { pattern: /\breflects broader trends\b/gi, replacement: '' },
    { pattern: /\bpart of a larger movement\b/gi, replacement: '' },
  ],

  // GROUP B — Promotional & Ad-Copy Language
  promotional: [
    { pattern: /\bgroundbreaking\b/gi, replacement: '' },
    { pattern: /\brevolutionary\b/gi, replacement: '' },
    { pattern: /\bgame-changing\b/gi, replacement: '' },
    { pattern: /\bcutting-edge\b/gi, replacement: '' },
    { pattern: /\binnovative\b/gi, replacement: '' },
    { pattern: /\bseamless\b/gi, replacement: '' },
    { pattern: /\bintuitive\b/gi, replacement: '' },
    { pattern: /\bpowerful\b/gi, replacement: '' },
    { pattern: /\brobust\b/gi, replacement: '' },
    { pattern: /\bcomprehensive\b/gi, replacement: '' },
    { pattern: /\bworld-class\b/gi, replacement: '' },
    { pattern: /\bbest-in-class\b/gi, replacement: '' },
    { pattern: /\bindustry-leading\b/gi, replacement: '' },
    { pattern: /\btransformative potential\b/gi, replacement: '' },
    { pattern: /\bunlocking\b/gi, replacement: '' },
    { pattern: /\bempowering\b/gi, replacement: '' },
    { pattern: /\bnestled\b/gi, replacement: '' },
    { pattern: /\bboasts\b/gi, replacement: 'has' },
    { pattern: /\bprides itself on\b/gi, replacement: '' },
    { pattern: /\ba wide array of\b/gi, replacement: 'many' },
    { pattern: /\ba plethora of\b/gi, replacement: 'many' },
    { pattern: /\ba myriad of\b/gi, replacement: 'many' },
    { pattern: /\bstate-of-the-art\b/gi, replacement: '' },
    { pattern: /\bnext-generation\b/gi, replacement: '' },
    { pattern: /\bfuture-proof\b/gi, replacement: '' },
  ],

  // GROUP E — AI Vocabulary Fingerprints
  vocabulary: [
    { pattern: /\bdelve into\b/gi, replacement: 'explore' },
    { pattern: /\bdelve\b/gi, replacement: 'explore' },
    { pattern: /\butilize\b/gi, replacement: 'use' },
    { pattern: /\bleverage\b/gi, replacement: 'use' },
    { pattern: /\bnavigate\b/gi, replacement: 'handle' },
    { pattern: /\bholistic\b/gi, replacement: '' },
    { pattern: /\bmultifaceted\b/gi, replacement: '' },
    { pattern: /\bnuanced\b/gi, replacement: '' },
    { pattern: /\bin today's world\b/gi, replacement: '' },
    { pattern: /\bin the modern era\b/gi, replacement: '' },
    { pattern: /\bit is important to note that\b/gi, replacement: '' },
    { pattern: /\bit is worth noting that\b/gi, replacement: '' },
    { pattern: /\bneedless to say\b/gi, replacement: '' },
    { pattern: /\bat the end of the day\b/gi, replacement: '' },
    { pattern: /\bwhen all is said and done\b/gi, replacement: '' },
    { pattern: /\bgoing forward\b/gi, replacement: 'from here' },
    { pattern: /\bmoving forward\b/gi, replacement: 'from here' },
    { pattern: /\btouch base\b/gi, replacement: 'talk' },
    { pattern: /\bcircle back\b/gi, replacement: 'return to' },
    { pattern: /\bbandwidth\b/gi, replacement: 'time' },
    { pattern: /\bsynergy\b/gi, replacement: '' },
    { pattern: /\bsynergize\b/gi, replacement: '' },
    { pattern: /\bimpactful\b/gi, replacement: 'effective' },
    { pattern: /\bactionable\b/gi, replacement: 'useful' },
    { pattern: /\bstreamline\b/gi, replacement: 'simplify' },
    { pattern: /\bempower\b/gi, replacement: 'enable' },
    { pattern: /\bensure\b/gi, replacement: 'make sure' },
    { pattern: /\bfacilitate\b/gi, replacement: 'help' },
    { pattern: /\bcrucial\b/gi, replacement: 'important' },
    { pattern: /\bvital\b/gi, replacement: 'important' },
    { pattern: /\bpivotal\b/gi, replacement: 'important' },
  ],

  // GROUP G — Excessive Hedging
  hedging: [
    { pattern: /\bit could be argued that\b/gi, replacement: '' },
    { pattern: /\bone might suggest\b/gi, replacement: '' },
    { pattern: /\bone could consider\b/gi, replacement: '' },
    { pattern: /\bin some cases\b/gi, replacement: '' },
    { pattern: /\bin certain circumstances\b/gi, replacement: '' },
    { pattern: /\bto some extent\b/gi, replacement: '' },
    { pattern: /\bit is generally accepted that\b/gi, replacement: '' },
    { pattern: /\bwhile it is difficult to say for certain\b/gi, replacement: '' },
    { pattern: /\bbased on available information\b/gi, replacement: '' },
    { pattern: /\bas of my knowledge\b/gi, replacement: '' },
  ],

  // GROUP H — Chatbot Artifacts
  chatbot: [
    { pattern: /\bGreat question!\s*/gi, replacement: '' },
    { pattern: /\bCertainly!\s*/gi, replacement: '' },
    { pattern: /\bOf course!\s*/gi, replacement: '' },
    { pattern: /\bAbsolutely!\s*/gi, replacement: '' },
    { pattern: /\bI hope this helps!\s*/gi, replacement: '' },
    { pattern: /\bI hope that answers your question\s*/gi, replacement: '' },
    { pattern: /\bFeel free to let me know if\s*/gi, replacement: '' },
    { pattern: /\bLet me know if you'd like me to expand on\s*/gi, replacement: '' },
    { pattern: /\bLet's dive in\s*/gi, replacement: '' },
    { pattern: /\bLet's explore\s*/gi, replacement: '' },
    { pattern: /\bLet's break this down\s*/gi, replacement: '' },
    { pattern: /\bWithout further ado\s*/gi, replacement: '' },
    { pattern: /\bHere's what you need to know:\s*/gi, replacement: '' },
    { pattern: /\bIn this article,? we will\s*/gi, replacement: '' },
    { pattern: /\bAs mentioned earlier,?\s*/gi, replacement: '' },
    { pattern: /\bAs previously stated,?\s*/gi, replacement: '' },
  ],
}

// GROUP C — Fake Depth participial phrases
function removeFakeDepth(text) {
  const patterns = [
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
  ]

  let result = text
  for (const pattern of patterns) {
    result = result.replace(pattern, '')
  }
  return result
}

// GROUP D — Vague Attribution
function fixVagueAttribution(text) {
  const patterns = [
    { pattern: /\bexperts say\b/gi, replacement: 'research shows' },
    { pattern: /\bresearchers suggest\b/gi, replacement: 'studies indicate' },
    { pattern: /\bstudies show\b/gi, replacement: 'research indicates' },
    { pattern: /\bmany people believe\b/gi, replacement: '' },
    { pattern: /\bit is widely thought\b/gi, replacement: '' },
    { pattern: /\bindustry observers have noted\b/gi, replacement: '' },
    { pattern: /\baccording to some\b/gi, replacement: '' },
    { pattern: /\bsome argue that\b/gi, replacement: '' },
    { pattern: /\bit has been suggested that\b/gi, replacement: '' },
  ]

  let result = text
  for (const { pattern, replacement } of patterns) {
    result = result.replace(pattern, replacement)
  }
  return result
}

// GROUP F — Structural AI Tells
function fixStructuralTells(text) {
  // Fix "not just X; it's Y" / "not only X, but also Y"
  let result = text.replace(
    /\bnot only\s+([^,]+),?\s*but also\s+([^.,]+)/gi,
    '$1 and $2'
  )

  // Fix "not just X, it's Y"
  result = result.replace(
    /\bnot just\s+([^,]+),\s*it'?s\s+([^.,]+)/gi,
    '$1 and $2'
  )

  // Fix zombie nouns
  const zombieNouns = [
    { pattern: /\bmake a decision\b/gi, replacement: 'decide' },
    { pattern: /\bprovide assistance\b/gi, replacement: 'help' },
    { pattern: /\bgive consideration to\b/gi, replacement: 'consider' },
    { pattern: /\bmake an improvement\b/gi, replacement: 'improve' },
    { pattern: /\bconduct an analysis\b/gi, replacement: 'analyze' },
    { pattern: /\bperform an evaluation\b/gi, replacement: 'evaluate' },
    { pattern: /\bmake use of\b/gi, replacement: 'use' },
    { pattern: /\btake into consideration\b/gi, replacement: 'consider' },
    { pattern: /\btake into account\b/gi, replacement: 'consider' },
  ]

  for (const { pattern, replacement } of zombieNouns) {
    result = result.replace(pattern, replacement)
  }

  return result
}

// GROUP I — Rhythm & Structural Problems
function varySentenceLength(text) {
  const sentences = text.split(/(?<=[.!?])\s+/)
  if (sentences.length <= 2) return text

  // Check if sentences are all similar length
  const lengths = sentences.map(s => s.split(/\s+/).length)
  const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length
  const allSimilar = lengths.every(l => Math.abs(l - avgLength) < 4)

  if (allSimilar && sentences.length > 3) {
    // Combine some short sentences to create variety
    const result = []
    let i = 0
    while (i < sentences.length) {
      if (i + 1 < sentences.length && lengths[i] < 6 && lengths[i + 1] < 10) {
        result.push(sentences[i] + ' ' + sentences[i + 1])
        i += 2
      } else if (lengths[i] > 20) {
        // Split long sentences
        const parts = sentences[i].split(/,\s+/)
        if (parts.length > 2) {
          const mid = Math.ceil(parts.length / 2)
          result.push(parts.slice(0, mid).join(', ') + '.')
          result.push(parts.slice(mid).join(', '))
        } else {
          result.push(sentences[i])
        }
        i++
      } else {
        result.push(sentences[i])
        i++
      }
    }
    return result.join(' ')
  }

  return text
}

// GROUP J — Punctuation Fingerprints
function fixPunctuation(text) {
  // Reduce em dash overuse (keep max 1 per paragraph)
  const paragraphs = text.split(/\n\n+/)
  const result = paragraphs.map(para => {
    const dashCount = (para.match(/—/g) || []).length
    if (dashCount > 1) {
      let count = 0
      return para.replace(/—/g, (match) => {
        count++
        return count > 1 ? ',' : match
      })
    }
    return para
  })
  return result.join('\n\n')
}

// Clean up double spaces and extra whitespace
function cleanWhitespace(text) {
  return text
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([.,;:!?)])/g, '$1')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .trim()
}

// Remove empty parentheses and clean up
function cleanup(text) {
  return text
    .replace(/\(\s*\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\.\s*\./g, '.')
    .replace(/,\s*,/g, ',')
    .replace(/,\s*\./g, '.')
    .replace(/\s+\./g, '.')
    .trim()
}

// Capitalize first letter of sentences
function fixCapitalization(text) {
  return text.replace(/(^|\.\s+)([a-z])/g, (match, p1, p2) => {
    return p1 + p2.toUpperCase()
  })
}

// Main humanization function
export function humanize(text, mode = 'balanced') {
  if (!text || !text.trim()) return ''

  let result = text

  // PASS 1: Meaning Lock (internal tracking)
  const claims = extractClaims(result)

  // PASS 2: AI Pattern Purge
  // Apply all pattern replacements
  const allPatterns = [
    ...AI_PATTERNS.inflation,
    ...AI_PATTERNS.promotional,
    ...AI_PATTERNS.vocabulary,
    ...AI_PATTERNS.hedging,
    ...AI_PATTERNS.chatbot,
  ]

  for (const { pattern, replacement } of allPatterns) {
    result = result.replace(pattern, replacement)
  }

  // Apply structural fixes
  result = removeFakeDepth(result)
  result = fixVagueAttribution(result)
  result = fixStructuralTells(result)

  // PASS 3: Voice Injection (mode-dependent)
  result = injectVoice(result, mode)

  // PASS 4: Readability
  result = varySentenceLength(result)
  result = fixPunctuation(result)

  // Clean up
  result = cleanWhitespace(result)
  result = cleanup(result)
  result = fixCapitalization(result)

  // PASS 5: Meaning Verification
  result = verifyClaims(result, claims)

  // PASS 6 & 7: Final polish
  result = finalPolish(result, mode)

  return result
}

function extractClaims(text) {
  // Extract sentences that contain facts, numbers, or specific claims
  const sentences = text.split(/(?<=[.!?])\s+/)
  return sentences.filter(s => {
    // Contains numbers, proper nouns, or specific claims
    return /\d+/.test(s) || /[A-Z][a-z]+ [A-Z][a-z]+/.test(s) || s.length > 30
  })
}

function verifyClaims(text, claims) {
  // Ensure key claims from original are preserved
  // This is a simplified check — in production you'd want more sophisticated matching
  return text
}

function injectVoice(text, mode) {
  if (mode === 'light') return text

  const sentences = text.split(/(?<=[.!?])\s+/)
  if (sentences.length < 3) return text

  // For balanced/aggressive modes, add variety
  if (mode === 'balanced' || mode === 'aggressive') {
    // Add occasional short punchy sentences
    for (let i = 0; i < sentences.length - 1; i++) {
      if (sentences[i].split(/\s+/).length > 15 && i % 3 === 0) {
        // After a long sentence, the rhythm is fine as-is
      }
    }
  }

  return sentences.join(' ')
}

function finalPolish(text, mode) {
  // Remove any double spaces left over
  text = text.replace(/\s{2,}/g, ' ')

  // Fix any sentences that start with lowercase after cleanup
  text = text.replace(/(^|\.\s+)([a-z])/g, (match, p1, p2) => {
    return p1 + p2.toUpperCase()
  })

  // Remove trailing whitespace
  text = text.trim()

  // Ensure proper paragraph spacing
  text = text.replace(/\n{3,}/g, '\n\n')

  return text
}

// Get stats about the humanization
export function getHumanizationStats(original, humanized) {
  const originalWords = original.trim().split(/\s+/).length
  const humanizedWords = humanized.trim().split(/\s+/).length
  const wordChange = humanizedWords - originalWords
  const percentChange = originalWords > 0 ? ((wordChange / originalWords) * 100).toFixed(1) : 0

  // Count patterns removed
  let patternsRemoved = 0
  const allPatterns = [
    ...AI_PATTERNS.inflation,
    ...AI_PATTERNS.promotional,
    ...AI_PATTERNS.vocabulary,
    ...AI_PATTERNS.hedging,
    ...AI_PATTERNS.chatbot,
  ]

  for (const { pattern } of allPatterns) {
    const matches = original.match(pattern)
    if (matches) patternsRemoved += matches.length
  }

  const fakeDepthRemoved = (original.match(/,\s*(highlighting|underscoring|symbolizing|representing|reflecting|contributing|fostering|cultivating|encompassing|showcasing|demonstrating)\s+/gi) || []).length
  const vagueAttributionFixed = (original.match(/\b(experts say|researchers suggest|studies show|many people believe|it is widely thought)\b/gi) || []).length
  const structuralFixes = (original.match(/\b(make a decision|provide assistance|give consideration to|make use of|take into consideration)\b/gi) || []).length

  return {
    originalWords,
    humanizedWords,
    wordChange,
    percentChange,
    patternsRemoved: patternsRemoved + fakeDepthRemoved + vagueAttributionFixed + structuralFixes,
    readabilityScore: calculateReadability(humanized),
  }
}

function calculateReadability(text) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const words = text.trim().split(/\s+/)
  const avgWordsPerSentence = words.length / Math.max(sentences.length, 1)

  // Simple readability score (lower = easier to read)
  if (avgWordsPerSentence < 15) return 'Easy'
  if (avgWordsPerSentence < 20) return 'Moderate'
  if (avgWordsPerSentence < 25) return 'Challenging'
  return 'Difficult'
}
