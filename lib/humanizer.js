function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

// ============================================================
// HUMANIZER v3 - Based on proven StealthWriter/GPTZero bypass patterns
// Minimal changes + reaction phrases + natural word swaps
// ============================================================

// Phase 1: Reaction phrases to insert between sentences
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

// Phase 2: Natural word swaps - minimal, context-aware
const WORD_SWAPS = [
  // Common AI words → natural alternatives
  { f: /\bstrange\b/gi, r: () => pick(['weird', 'odd', 'unusual']) },
  { f: /\bmagic\b/gi, r: () => pick(['wonder', 'charm', 'beauty']) },
  { f: /\bordinary\b/gi, r: () => pick(['commonplace', 'everyday', 'regular', 'normal']) },
  { f: /\bquiet\b/gi, r: () => pick(['calm', 'peaceful', 'still']) },
  { f: /\buneventful\b/gi, r: () => pick(['dull', 'unmarked', 'plain']) },
  { f: /\bstretches\b/gi, r: () => pick(['periods', 'spans', 'blocks']) },
  { f: /\bimportant\b/gi, r: () => pick(['significant', 'meaningful', 'notable']) },
  { f: /\bliving\b/gi, r: () => pick(['experiencing', 'going through']) },
  { f: /\bmilestones\b/gi, r: () => pick(['landmarks', 'markers', 'events']) },
  { f: /\bdramatic\b/gi, r: () => pick(['major', 'big', 'striking']) },
  { f: /\bobvious\b/gi, r: () => pick(['apparent', 'clear', 'evident']) },
  { f: /\bturning points\b/gi, r: () => pick(['shifts', 'changes', 'moments']) },
  { f: /\broutine\b/gi, r: () => pick(['habit', 'pattern', 'normal flow']) },
  { f: /\brhythm\b/gi, r: () => pick(['beat', 'pace', 'flow']) },
  { f: /\breflect\b/gi, r: () => pick(['look back', 'think back']) },
  { f: /\bcarry\b/gi, r: () => pick(['hold', 'have', 'contain']) },
  { f: /\bmeaning\b/gi, r: () => pick(['significance', 'value', 'weight']) },
  { f: /\bexpected\b/gi, r: () => pick(['anticipated', 'imagined', 'thought']) },
  { f: /\brandom\b/gi, r: () => pick(['chance', 'arbitrary', 'unexpected']) },
  { f: /\bafternoon\b/gi, r: () => pick(['day', 'moment', 'time']) },
  { f: /\bspecial\b/gi, r: () => pick(['particular', 'notable', 'remarkable']) },
  { f: /\bharder\b/gi, r: () => pick(['more', 'longer', 'louder']) },
  { f: /\busual\b/gi, r: () => pick(['normal', 'typical', 'regular']) },
  { f: /\bconversation\b/gi, r: () => pick(['talk', 'chat', 'discussion']) },
  { f: /\bforgot\b/gi, r: () => pick(['missed', 'overlooked', 'forgot about']) },
  { f: /\brealize\b/gi, r: () => pick(['see', 'understand', 'notice']) },
  { f: /\bchanged\b/gi, r: () => pick(['altered', 'shifted', 'transformed']) },
  { f: /\bthink\b/gi, r: () => pick(['see things', 'view things', 'approach things']) },
  { f: /\bsimple\b/gi, r: () => pick(['basic', 'easy', 'straightforward']) },
  { f: /\bfamiliar\b/gi, r: () => pick(['known', 'comfortable', 'recognized']) },
  { f: /\bbecome\b/gi, r: () => pick(['turn into', 'grow into', 'develop into']) },
  { f: /\bmemory\b/gi, r: () => pick(['moment', 'thing', 'experience']) },
  { f: /\brevisit\b/gi, r: () => pick(['go back to', 'return to', 'relive']) },
  { f: /\binclined\b/gi, r: () => pick(['likely', 'prone', 'tending']) },
  { f: /\bbelieve\b/gi, r: () => pick(['think', 'feel', 'assume']) },
  { f: /\bmeaningful\b/gi, r: () => pick(['special', 'significant', 'important']) },
  { f: /\bextraordinary\b/gi, r: () => pick(['remarkable', 'special', 'unusual']) },
  { f: /\bachievements\b/gi, r: () => pick(['accomplishments', 'successes', 'wins']) },
  { f: /\bcelebrations\b/gi, r: () => pick(['feasts', 'parties', 'gatherings']) },
  { f: /\blabel\b/gi, r: () => pick(['call', 'name', 'mark']) },
  { f: /\brare\b/gi, r: () => pick(['uncommon', 'infrequent', 'scarce']) },
  { f: /\bempty\b/gi, r: () => pick(['hollow', 'meaningless', 'void']) },
  { f: /\bfortunately\b/gi, r: () => pick(['thankfully', 'luckily', 'happily']) },
  { f: /\brepetition\b/gi, r: () => pick(['repeating things', 'doing things again', 'patterns']) },
  { f: /\bsongs\b/gi, r: () => pick(['tunes', 'tracks', 'music']) },
  { f: /\broute\b/gi, r: () => pick(['path', 'way', 'road']) },
  { f: /\bhabits\b/gi, r: () => pick(['things', 'actions', 'routines']) },
  { f: /\bshape\b/gi, r: () => pick(['form', 'mold', 'build']) },
  { f: /\battention\b/gi, r: () => pick(['notice', 'care', 'focus']) },
  { f: /\bpatterns\b/gi, r: () => pick(['trends', 'habits', 'routines']) },
  { f: /\bquietly\b/gi, r: () => pick(['silently', 'softly', 'gently']) },
  { f: /\bidentity\b/gi, r: () => pick(['belonging', 'sense of self', 'who you are']) },
  { f: /\bannouncing\b/gi, r: () => pick(['making a statement', 'calling attention', 'showing off']) },
  { f: /\bcomfort\b/gi, r: () => pick(['peace', 'ease', 'relief']) },
  { f: /\bfamiliarity\b/gi, r: () => pick(['knowing something well', 'routine', 'sameness']) },
  { f: /\bcreates\b/gi, r: () => pick(['leaves', 'makes', 'gives']) },
  { f: /\bcalm\b/gi, r: () => pick(['peace', 'quiet', 'stillness']) },
  { f: /\bconstantly\b/gi, r: () => pick(['always', 'continually', 'forever']) },
  { f: /\bpushes\b/gi, r: () => pick(['wants', 'demands', 'asks for']) },
  { f: /\bproductivity\b/gi, r: () => pick(['output', 'work', 'results']) },
  { f: /\bexcitement\b/gi, r: () => pick(['thrills', 'action', 'drama']) },
  { f: /\bgrounding\b/gi, r: () => pick(['refreshing', 'stabilizing', 'centering']) },
  { f: /\bstaying\b/gi, r: () => pick(['remaining', 'being', 'staying put']) },
  { f: /\bmeaningle\b/gi, r: () => pick(['pointless', 'without purpose', 'vain']) },
  { f: /\bunnoticed\b/gi, r: () => pick(['invisible', 'unseen', 'hidden']) },
  { f: /\bdecisions\b/gi, r: () => pick(['choices', 'calls', 'moves']) },
  { f: /\bfocus\b/gi, r: () => pick(['pay attention', 'concentrate', 'look at']) },
  { f: /\brespond\b/gi, r: () => pick(['react', 'deal', 'handle']) },
  { f: /\bfrustrations\b/gi, r: () => pick(['irritations', 'annoyances', 'problems']) },
  { f: /\bappreciate\b/gi, r: () => pick(['acknowledge', 'notice', 'value']) },
  { f: /\bchoices\b/gi, r: () => pick(['decisions', 'actions', 'moves']) },
  { f: /\bgrowth\b/gi, r: () => pick(['development', 'progress', 'change']) },
  { f: /\bfrequently\b/gi, r: () => pick(['often', 'commonly', 'regularly']) },
  { f: /\bquietly\b/gi, r: () => pick(['unobtrusively', 'softly', 'silently']) },
  { f: /\bpatient\b/gi, r: () => pick(['calm', 'tolerant', 'understanding']) },
  { f: /\bconfident\b/gi, r: () => pick(['sure', 'self-assured', 'bold']) },
  { f: /\bunderstanding\b/gi, r: () => pick(['empathetic', 'compassionate', 'aware']) },
  { f: /\bdefinite\b/gi, r: () => pick(['clear', 'obvious', 'specific']) },
  { f: /\bmoment\b/gi, r: () => pick(['point', 'time', 'instant']) },
  { f: /\bgradual\b/gi, r: () => pick(['slow', 'steady', 'incremental']) },
  { f: /\binvisible\b/gi, r: () => pick(['unnoticeable', 'hidden', 'subtle']) },
  { f: /\bshift\b/gi, r: () => pick(['change', 'turn', 'transition']) },
  { f: /\bperhaps\b/gi, r: () => pick(['maybe', 'possibly', 'could be']) },
  { f: /\bunremarkable\b/gi, r: () => pick(['banal', 'ordinary', 'plain']) },
  { f: /\bforced\b/gi, r: () => pick(['pushed', 'artificial', 'unnatural']) },
  { f: /\bamazing\b/gi, r: () => pick(['wonderful', 'great', 'incredible']) },
  { f: /\bgentle\b/gi, r: () => pick(['soft', 'quiet', 'mild']) },
  { f: /\bawareness\b/gi, r: () => pick(['knowing', 'understanding', 'recognition']) },
  { f: /\bmatters\b/gi, r: () => pick(['is important', 'counts', 'has value']) },
  { f: /\bplays a role\b/gi, r: () => pick(['is part', 'matters', 'counts']) },
  { f: /\bmiss\b/gi, r: () => pick(['long for', 'wish for', 'want back']) },
  // AI fingerprint words
  { f: /\bserves as\b/gi, r: () => 'is' },
  { f: /\bstands as\b/gi, r: () => 'is' },
  { f: /\bfunctions as\b/gi, r: () => 'is' },
  { f: /\bacts as\b/gi, r: () => 'is' },
  { f: /\bnavigate\b/gi, r: () => pick(['deal with', 'handle', 'work through']) },
  { f: /\bnavigating\b/gi, r: () => pick(['dealing with', 'handling', 'working through']) },
  { f: /\blandscape\b/gi, r: () => pick(['field', 'area', 'space']) },
  { f: /\becosystem\b/gi, r: () => pick(['industry', 'community', 'network']) },
  { f: /\brobust\b/gi, r: () => pick(['strong', 'solid', 'reliable']) },
  { f: /\bcomprehensive\b/gi, r: () => pick(['full', 'complete', 'thorough']) },
  { f: /\bleverage\b/gi, r: () => pick(['use', 'make use of']) },
  { f: /\bleveraged\b/gi, r: () => pick(['used', 'applied']) },
  { f: /\butilize\b/gi, r: () => pick(['use']) },
  { f: /\butilized\b/gi, r: () => pick(['used']) },
  { f: /\btransformative\b/gi, r: () => pick(['major', 'significant']) },
  { f: /\binnovative\b/gi, r: () => pick(['new', 'creative']) },
  { f: /\bseamless\b/gi, r: () => pick(['smooth', 'easy']) },
  { f: /\bholistic\b/gi, r: () => pick(['complete', 'full']) },
  { f: /\bnuanced\b/gi, r: () => pick(['detailed', 'subtle']) },
  { f: /\bmyriad\b/gi, r: () => pick(['many', 'lots of']) },
  { f: /\bplethora\b/gi, r: () => pick(['lot', 'bunch']) },
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
  { f: /\brapidly evolving\b/gi, r: () => pick(['fast-changing', 'quickly changing']) },
  { f: /\bever-changing\b/gi, r: () => pick(['always changing', 'constantly shifting']) },
  { f: /\bconstantly evolving\b/gi, r: () => pick(['always changing', 'always shifting']) },
  { f: /\bin today's world\b/gi, r: () => 'today' },
  { f: /\bin the modern era\b/gi, r: () => 'now' },
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

// Phase 3: Contractions
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

// Phase 4: Remove fake depth patterns
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

// ============================================================
// MAIN PIPELINE
// ============================================================
const MODES = {
  light:     { reactions: false, words: true, contractions: true, fakeDepth: false },
  medium:    { reactions: true, words: true, contractions: true, fakeDepth: true },
  aggressive:{ reactions: true, words: true, contractions: true, fakeDepth: true },
}

export function humanize(text, strength = 'medium') {
  if (!text || !text.trim()) return { text: '', stats: { changes: 0 } }

  const cfg = MODES[strength]
  let changes = 0
  let result = text

  // Phase 1: Word swaps (apply to full text first)
  if (cfg.words) {
    for (const { f, r } of WORD_SWAPS) {
      const m = result.match(f)
      if (m) {
        const replacement = typeof r === 'function' ? r() : r
        // Count how many replacements
        const count = (result.match(f) || []).length
        changes += count
        result = result.replace(f, replacement)
      }
    }
  }

  // Phase 2: Remove fake depth patterns
  if (cfg.fakeDepth) {
    for (const p of FAKE_DEPTH) {
      const m = result.match(p)
      if (m && m[0].length < 20) {
        changes++
        result = result.replace(p, '')
      }
    }
  }

  // Phase 3: Contractions
  if (cfg.contractions) {
    for (const [f, r] of CONTRACTIONS) {
      if (f.test(result)) {
        const count = (result.match(f) || []).length
        changes += count
        result = result.replace(f, r)
      }
    }
  }

  // Phase 4: Add reaction phrases between sentences
  if (cfg.reactions) {
    const sentences = result.split(/(?<=[.!?])\s+/).filter(s => s.trim())
    const out = []
    const reactionCount = strength === 'aggressive' ? Math.max(1, Math.floor(sentences.length / 3)) :
                          Math.max(1, Math.floor(sentences.length / 5))

    // Pick random positions to insert reactions
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
