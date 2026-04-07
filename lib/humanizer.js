function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

// ============================================================
// PHASE 1: Sentence splitting - safe, simple approach
// ============================================================
function splitSentences(sentences, strength) {
  const out = []
  const threshold = strength === 'aggressive' ? 14 : strength === 'medium' ? 18 : 25

  for (const sent of sentences) {
    const words = sent.split(/\s+/)
    if (words.length <= threshold) {
      out.push(sent)
      continue
    }

    // Split at semicolons (always safe)
    if (sent.includes(';')) {
      const parts = sent.split(/\s*;\s*/)
      for (let i = 0; i < parts.length; i++) {
        let p = parts[i].trim()
        if (!p) continue
        if (i > 0 && /^[a-z]/.test(p)) p = p.charAt(0).toUpperCase() + p.slice(1)
        if (!p.match(/[.!?]$/)) p += '.'
        out.push(p)
      }
      continue
    }

    // Split at ", but " where second part is a full clause
    const butMatch = sent.match(/^(.{15,}?),\s+but\s+([A-Z][a-zA-Z\s',-]{5,})$/)
    if (butMatch) {
      const first = butMatch[1].trim()
      let second = butMatch[2].trim()
      if (!first.endsWith('.')) out.push(first + '.')
      else out.push(first)
      if (!second.match(/[.!?]$/)) second += '.'
      out.push(second)
      continue
    }

    // Split at ", and [pronoun] [verb]" - common AI pattern
    const andMatch = sent.match(/^(.{15,}?),\s+and\s+(it|they|we|you|he|she|this|that)\s+(is|are|was|were|has|have|had|will|would|could|should|can|may|might|do|does|did|be|been|being|gets?|made?|takes?|goes?|came?|sees?|knew?|thinks?|says?|told?|gave?|finds?|works?|needs?|uses?|tries?|helps?|seems?|shows?|provides?|creates?|builds?|runs?|keeps?|turns?|brings?|starts?|continues?|allows?|leads?|includes?|remains?|reduces?|increases?|improves?|changes?|affects?|influences?|enables?|supports?|requires?|produces?|maintains?|drives?|promotes?|ensures?|represents?|establishes?|grows?|offers?|exists?|happens?|occurs?|appears?|follows?|suggests?|demonstrates?|indicates?|highlights?|emphasizes?|reflects?|addresses?|identifies?|determines?|recognizes?|understands?|explains?|describes?|analyzes?|examines?|explores?|discusses?|considers?|evaluates?|assesses?|compares?|reveals?|confirms?|reports?|notes?|observes?|measures?|calculates?|estimates?|predicts?|recommends?|proposes?|argues?|claims?|asserts?|states?|concludes?|decides?|chooses?|selects?|prefers?|wants?|hopes?|expects?|plans?|intends?|aims?|seeks?|attempts?|manages?|handles?|deals?|faces?|encounters?|experiences?|suffers?|enjoys?|loves?|likes?|hates?|fears?|worries?|cares?|matters?|concerns?|interests?|surprises?|amazes?|impresses?|satisfies?|disappoints?|frustrates?|confuses?|challenges?|threatens?|damages?|destroys?|breaks?|fixes?|solves?|resolves?|settles?|reaches?|achieves?|accomplishes?|completes?|finishes?|ends?|stops?|begins?|launches?|opens?|closes?|shuts?|locks?|fills?|empties?|covers?|hides?|reveals?|exposes?|uncovers?|discovers?|invents?|designs?|prepares?|arranges?|organizes?|sets?|puts?|places?|positions?|lays?|lies?|sits?|stands?|rises?|raises?|lifts?|drops?|falls?|throws?|catches?|holds?|grabs?|pulls?|pushes?|presses?|touches?|feels?|hears?|listens?|watches?|looks?|reads?|writes?|speaks?|talks?|says?|asks?|answers?|replies?|responds?|calls?|phones?|texts?|emails?|sends?|receives?|gets?|obtains?|acquires?|gains?|earns?|wins?|loses?|misses?|fails?|succeeds?|passes?|survives?|lives?|dies?|kills?|saves?|protects?|defends?|attacks?|fights?|battles?|competes?|races?|plays?|performs?|acts?|behaves?|reacts?|adapts?|adjusts?|modifies?|alters?|shifts?|moves?|travels?|walks?|runs?|jogs?|sprints?|dashes?|rushes?|hurries?|speeds?|accelerates?|slows?|stops?|pauses?|rests?|sleeps?|wakes?|dreams?|thinks?|imagines?|wonders?|questions?|doubts?|believes?|trusts?|accepts?|rejects?|refuses?|denies?|admits?|confesses?|acknowledges?|realizes?|notices?|recognizes?|remembers?|forgets?|recalls?|reminds?|learns?|studies?|teaches?|trains?|practices?|repeats?|reviews?|revises?|edits?|corrects?|checks?|tests?|tries?|attempts?|experiments?|explores?|investigates?|researches?|searches?|seeks?|hunts?|looks?|finds?|discovers?|detects?|spots?|notices?|observes?|watches?|monitors?|tracks?|follows?|traces?|records?|documents?|reports?|describes?|explains?|clarifies?|illustrates?|demonstrates?|shows?|displays?|presents?|exhibits?|reveals?|exposes?|uncovers?|discovers?|finds?|locates?|identifies?|recognizes?|distinguishes?|differentiates?|separates?|divides?|splits?|breaks?|cracks?|fractures?|shatters?|smashes?|crushes?|squeezes?|presses?|pushes?|shoves?|pulls?|drags?|draws?|attracts?|appeals?|interests?|fascinates?|captivates?|charms?|delights?|pleases?|satisfies?|fulfills?|completes?|finishes?|ends?|concludes?|terminates?|ceases?|stops?|quits?|leaves?|departs?|exits?|goes?|moves?|shifts?|transfers?|transports?|carries?|bears?|brings?|takes?|fetches?|delivers?|sends?|mails?|ships?|dispatches?|transmits?|broadcasts?|publishes?|releases?|issues?|distributes?|spreads?|scatters?|disperses?|diffuses?|extends?|expands?|grows?|increases?|rises?|climbs?|ascends?|mounts?|scales?|reaches?|attains?|achieves?|accomplishes?|realizes?|fulfills?|satisfies?|meets?|matches?|equals?|balances?|weighs?|measures?|calculates?|computes?|counts?|numbers?|totals?|sums?|adds?|subtracts?|multiplies?|divides?|splits?|shares?|distributes?|allocates?|assigns?|appoints?|nominates?|elects?|chooses?|selects?|picks?|decides?|determines?|resolves?|settles?|fixes?|repairs?|mends?|heals?|cures?|treats?|handles?|manages?|controls?|directs?|guides?|leads?|steers?|navigates?|pilots?|drives?|rides?|flies?|sails?|rows?|swims?|dives?|jumps?|leaps?|hops?|skips?|dances?|sings?|hums?|whistles?|plays?|performs?|acts?|stars?|features?|appears?|shows?|displays?|presents?|exhibits?|demonstrates?|illustrates?|depicts?|portrays?|represents?|symbolizes?|stands?|means?|signifies?|indicates?|suggests?|implies?|hints?|insinuates?|intimates?|communicates?|conveys?|expresses?|states?|declares?|announces?|proclaims?|publishes?|broadcasts?|reports?|relates?|recounts?|narrates?|tells?|says?|speaks?|talks?|chats?|converses?|discusses?|debates?|argues?|disputes?|contests?|challenges?|questions?|doubts?|wonders?|ponders?|considers?|contemplates?|reflects?|meditates?|thinks?|reasons?|analyzes?|examines?|inspects?|scrutinizes?|studies?|researches?|investigates?|explores?|probes?|searches?|seeks?|looks?|hunts?|tracks?|traces?|follows?|pursues?|chases?|catches?|captures?|seizes?|grabs?|grasps?|clutches?|holds?|grips?|clasps?|embraces?|hugs?|squeezes?|presses?|pushes?|shoves?|thrusts?|drives?|forces?|compels?|obliges?|requires?|demands?|insists?|urges?|presses?|encourages?|motivates?|inspires?|stimulates?|excites?|thrills?|delights?|pleases?|satisfies?|gratifies?|fulfills?|completes?|finishes?|ends?|concludes?|closes?|shuts?|seals?|locks?|secures?|fastens?|attaches?|connects?|joins?|links?|binds?|ties?|wraps?|covers?|coats?|paints?|colors?|dyes?|stains?|marks?|labels?|tags?|names?|calls?|titles?|terms?|designates?|identifies?|recognizes?|acknowledges?|accepts?|receives?|welcomes?|greets?|meets?|encounters?|faces?|confronts?|challenges?|dares?|risks?|gambles?|bets?|wagers?|stakes?|invests?|spends?|pays?|costs?|charges?|bills?|invoicing?|prices?|values?|estimates?|assesses?|evaluates?|judges?|rates?|ranks?|grades?|scores?|marks?|checks?|tests?|examines?|inspects?|reviews?|audits?|surveys?|polls?|questions?|interviews?|asks?|inquires?|queries?|requests?|demands?|orders?|commands?|directs?|instructs?|teaches?|educates?|trains?|coaches?|tutors?|guides?|advises?|counsels?|consults?|discusses?|talks?|speaks?|says?|tells?|informs?|notifies?|alerts?|warns?|cautions?|advises?|recommends?|suggests?|proposes?|offers?|presents?|submits?|provides?|supplies?|furnishes?|delivers?|gives?|grants?|awards?|bestows?|confers?|presents?|hands?|passes?|transfers?|conveys?|communicates?|expresses?|shows?|demonstrates?|displays?|exhibits?|presents?|reveals?|exposes?|uncovers?|discloses?|divulges?|confesses?|admits?|acknowledges?|recognizes?|accepts?|agrees?|consents?|approves?|endorses?|supports?|backs?|champions?|advocates?|promotes?|advances?|furthers?|helps?|aids?|assists?|serves?|benefits?|profits?|gains?|earns?|wins?|achieves?|accomplishes?|attains?|reaches?|obtains?|secures?|acquires?|gets?|procures?|purchases?|buys?|shops?|orders?|books?|reserves?|saves?|stores?|keeps?|retains?|holds?|maintains?|preserves?|protects?|defends?|guards?|shields?|shelters?|covers?|hides?|conceals?|masks?|disguises?|camouflages?|veils?|cloaks?|screens?|blocks?|obstructs?|hinders?|impedes?|prevents?|stops?|halts?|ceases?|ends?|finishes?|completes?|concludes?|terminates?|closes?|shuts?|seals?|locks?|secures?|fastens?|attaches?|connects?|joins?|links?|binds?|ties?)\b/i)
    if (andMatch) {
      const first = andMatch[1].trim()
      let second = andMatch[2] + ' ' + andMatch[3]
      if (!first.endsWith('.')) out.push(first + '.')
      else out.push(first)
      if (!second.match(/[.!?]$/)) second += '.'
      out.push(second)
      continue
    }

    // Split at ", as [noun phrase] [verb]" - very common AI pattern
    // e.g., "..., as concerns about data privacy continue to spark debate"
    const asMatch = sent.match(/^(.{15,}?),\s+as\s+([A-Z][a-zA-Z\s',-]{8,})\s+(continue|remain|persist|grow|increase|decrease|decline|rise|fall|drop|surge|plunge|soar|plummet|fluctuate|vary|shift|change|evolve|develop|emerge|arise|appear|occur|happen|take place|come about|come up|come forward|come into|come to|come from|come with|come without|come across|come along|come around|come back|come down|come in|come off|come on|come out|come over|come through|come up|come under)\b/i)
    if (asMatch) {
      const first = asMatch[1].trim()
      let second = asMatch[2] + ' ' + asMatch[3]
      if (!first.endsWith('.')) out.push(first + '.')
      else out.push(first)
      if (!second.match(/[.!?]$/)) second += '.'
      out.push(second)
      continue
    }

    // Split at ", while [subject] [verb]" - only if second part is clearly independent
    const whileMatch = sent.match(/^(.{15,}?),\s+while\s+([A-Z][a-zA-Z\s',-]{5,})$/)
    if (whileMatch) {
      const first = whileMatch[1].trim()
      let second = 'While ' + whileMatch[2].trim()
      if (!first.endsWith('.')) out.push(first + '.')
      else out.push(first)
      if (!second.match(/[.!?]$/)) second += '.'
      out.push(second)
      continue
    }

    // Split at ", which [verb]" - convert to "This [verb]"
    const whichMatch = sent.match(/^(.{15,}?),\s+which\s+(is|are|was|were|has|have|had|will|would|could|should|can|may|might)\s+([a-zA-Z\s',-]{5,})$/i)
    if (whichMatch) {
      const first = whichMatch[1].trim()
      let second = 'This ' + whichMatch[2] + ' ' + whichMatch[3]
      if (!first.endsWith('.')) out.push(first + '.')
      else out.push(first)
      if (!second.match(/[.!?]$/)) second += '.'
      out.push(second)
      continue
    }

    out.push(sent)
  }
  return out
}

// ============================================================
// PHASE 2: Combine very short sentences
// ============================================================
function combineSentences(sentences) {
  const out = []
  let i = 0
  while (i < sentences.length) {
    const w1 = sentences[i].split(/\s+/).length
    const w2 = i + 1 < sentences.length ? sentences[i + 1].split(/\s+/).length : 0

    if (w1 <= 5 && w2 <= 5 && i + 1 < sentences.length) {
      const connectors = [' — ', ', and ', '; ']
      out.push(sentences[i] + pick(connectors) + sentences[i + 1].charAt(0).toLowerCase() + sentences[i + 1].slice(1))
      i += 2
      continue
    }

    out.push(sentences[i])
    i++
  }
  return out
}

// ============================================================
// PHASE 3: Fragment injection (creates burstiness safely)
// ============================================================
function injectFragments(sentences, strength) {
  if (sentences.length < 4) return sentences

  const fragments = [
    'Not even close.',
    'But here\'s the thing.',
    'And it matters.',
    'No surprise there.',
    'That\'s the reality.',
    'It\'s not that simple.',
    'Which makes sense.',
    'But not for the reason you\'d think.',
    'At least, not yet.',
    'Or so the theory goes.',
    'And that changes everything.',
    'At least in theory.',
  ]

  const out = [...sentences]
  const count = strength === 'aggressive' ? Math.floor(sentences.length / 3) :
                strength === 'medium' ? Math.floor(sentences.length / 5) :
                Math.floor(sentences.length / 8)

  const positions = []
  for (let i = 1; i < out.length - 1; i++) {
    if (out[i].split(/\s+/).length >= 10) {
      positions.push(i + 1)
    }
  }

  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[positions[i], positions[j]] = [positions[j], positions[i]]
  }

  const selected = positions.slice(0, Math.min(count, positions.length)).sort((a, b) => b - a)
  for (const pos of selected) {
    out.splice(pos, 0, pick(fragments))
  }

  return out
}

// ============================================================
// PHASE 4: Information reordering (DIPPER-style)
// Only clean, safe patterns
// ============================================================
function reorderInformation(sentences, strength) {
  if (strength === 'light') return sentences

  const out = []
  for (const sent of sentences) {
    let done = false

    // "It is important to note that X" → "Here's the thing: X"
    if (!done) {
      const m = sent.match(/^It\s+is\s+important\s+to\s+note\s+that\s+(.+)$/i)
      if (m && Math.random() < 0.7) {
        let x = m[1]
        if (x.endsWith('.')) x = x.slice(0, -1)
        out.push(`Here's the thing: ${x.charAt(0).toUpperCase() + x.slice(1)}.`)
        done = true
      }
    }

    // "It is important/crucial/essential to X" → "X matters"
    if (!done) {
      const m = sent.match(/^It\s+is\s+(important|crucial|essential|vital|critical|necessary)\s+to\s+(.+)$/i)
      if (m && Math.random() < 0.6) {
        let x = m[2].replace(/\.$/, '')
        out.push(`${x.charAt(0).toUpperCase() + x.slice(1)} matters.`)
        done = true
      }
    }

    // "Research/Studies has/have shown that X" → "X, research shows"
    if (!done) {
      const m = sent.match(/^(Research|Studies|Evidence|Data)\s+(has|have)\s+(shown|found|demonstrated|indicated)\s+(that\s+)?(.+)$/i)
      if (m && Math.random() < 0.7) {
        let ending = m[5].replace(/\.$/, '')
        out.push(`${ending.charAt(0).toUpperCase() + ending.slice(1)} — ${m[1].toLowerCase()} ${m[2]} ${m[3]}.`)
        done = true
      }
    }

    if (!done) out.push(sent)
  }
  return out
}

// ============================================================
// PHASE 5: Safe vocabulary cleanup
// Only single-word swaps and whole-sentence starters
// ============================================================
const SAFE_STARTERS = [
  [/^furthermore,?\s*/i, () => ''],
  [/^moreover,?\s*/i, () => ''],
  [/^in addition,?\s*/i, () => ''],
  [/^additionally,?\s*/i, () => ''],
  [/^consequently,?\s*/i, () => 'So '],
  [/^therefore,?\s*/i, () => 'So '],
  [/^in conclusion,?\s*/i, () => ''],
  [/^in summary,?\s*/i, () => ''],
  [/^however,?\s*/i, () => 'But '],
  [/^nevertheless,?\s*/i, () => 'Still, '],
  [/^in order to\b/i, () => 'To '],
]

const SAFE_WORDS = [
  { f: /\butilize\b/gi, r: 'use' },
  { f: /\bleverage\b/gi, r: 'use' },
  { f: /\bholistic\b/gi, r: 'complete' },
  { f: /\bseamless\b/gi, r: 'smooth' },
  { f: /\brobust\b/gi, r: 'solid' },
  { f: /\bcomprehensive\b/gi, r: 'thorough' },
  { f: /\binnovative\b/gi, r: 'new' },
  { f: /\bcutting-edge\b/gi, r: 'advanced' },
  { f: /\bgroundbreaking\b/gi, r: 'new' },
  { f: /\brevolutionary\b/gi, r: 'major' },
  { f: /\bgame-changing\b/gi, r: 'significant' },
  { f: /\btransformative\b/gi, r: 'major' },
  { f: /\bunprecedented\b/gi, r: 'unusual' },
  { f: /\bmyriad\b/gi, r: 'many' },
  { f: /\bplethora\b/gi, r: 'lot' },
  { f: /\bmultifaceted\b/gi, r: 'complex' },
  { f: /\bnuanced\b/gi, r: 'detailed' },
  { f: /\bcrucial importance\b/gi, r: 'importance' },
  { f: /\bcrucial\b/gi, r: 'important' },
  { f: /\bvital\b/gi, r: 'important' },
  { f: /\bpivotal\b/gi, r: 'key' },
  { f: /\bstreamline\b/gi, r: 'simplify' },
  { f: /\boptimize\b/gi, r: 'improve' },
  { f: /\bempower\b/gi, r: 'enable' },
  { f: /\bensure\b/gi, r: 'make sure' },
  { f: /\bfacilitate\b/gi, r: 'help' },
  { f: /\bsynergy\b/gi, r: 'teamwork' },
  { f: /\bsynergistic\b/gi, r: 'combined' },
  { f: /\bbandwidth\b/gi, r: 'time' },
  { f: /\bimpactful\b/gi, r: 'effective' },
  { f: /\bactionable\b/gi, r: 'useful' },
  { f: /\bdelve\b/gi, r: 'dig into' },
  { f: /\btapestry\b/gi, r: 'mix' },
  { f: /\bbustling\b/gi, r: 'busy' },
  { f: /\bvibrant\b/gi, r: 'lively' },
  { f: /\bdynamic\b/gi, r: 'active' },
  { f: /\brapidly evolving\b/gi, r: 'fast-changing' },
  { f: /\bever-changing\b/gi, r: 'changing' },
  { f: /\bconstantly evolving\b/gi, r: 'always changing' },
  { f: /\bin today's world\b/gi, r: 'today' },
  { f: /\bin the modern era\b/gi, r: 'now' },
  { f: /\bacross the globe\b/gi, r: 'worldwide' },
  { f: /\baround the world\b/gi, r: 'everywhere' },
  { f: /\bin the realm of\b/gi, r: 'in' },
  { f: /\bin the field of\b/gi, r: 'in' },
  { f: /\bwith the aim of\b/gi, r: 'to' },
  { f: /\bfor the purpose of\b/gi, r: 'to' },
  { f: /\bthereby\b/gi, r: 'which' },
  { f: /\bwhereby\b/gi, r: 'where' },
  { f: /\bat the end of the day\b/gi, r: 'ultimately' },
  { f: /\bwhen all is said and done\b/gi, r: 'in the end' },
  { f: /\bneedless to say\b/gi, r: '' },
  { f: /\bGreat question\b/gi, r: '' },
  { f: /\bCertainly\b/gi, r: '' },
  { f: /\bOf course\b/gi, r: '' },
  { f: /\bAbsolutely\b/gi, r: '' },
  { f: /\bI hope this helps\b/gi, r: '' },
  { f: /\bFeel free to let me know\b/gi, r: '' },
  { f: /\bLet me know if you'd like\b/gi, r: '' },
  { f: /\bLet's dive in\b/gi, r: '' },
  { f: /\bLet's explore\b/gi, r: '' },
  { f: /\bWithout further ado\b/gi, r: '' },
  { f: /\bHere's what you need to know\b/gi, r: '' },
  { f: /\bIn this article,? we will\b/gi, r: '' },
  { f: /\bAs mentioned earlier\b/gi, r: '' },
  { f: /\bAs previously stated\b/gi, r: '' },
]

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

const CONTRACTIONS = [
  [/\bdo not\b/gi, "don't"], [/\bdoes not\b/gi, "doesn't"], [/\bdid not\b/gi, "didn't"],
  [/\bis not\b/gi, "isn't"], [/\bare not\b/gi, "aren't"], [/\bwas not\b/gi, "wasn't"],
  [/\bwere not\b/gi, "weren't"], [/\bhas not\b/gi, "hasn't"], [/\bhave not\b/gi, "haven't"],
  [/\bhad not\b/gi, "hadn't"], [/\bwill not\b/gi, "won't"], [/\bwould not\b/gi, "wouldn't"],
  [/\bcould not\b/gi, "couldn't"], [/\bshould not\b/gi, "shouldn't"], [/\bcannot\b/gi, "can't"],
  [/\bit is\b/gi, "it's"], [/\bthat is\b/gi, "that's"], [/\bthere is\b/gi, "there's"],
  [/\bthey are\b/gi, "they're"], [/\bwe are\b/gi, "we're"], [/\byou are\b/gi, "you're"],
  [/\bI am\b/gi, "I'm"], [/\bhe is\b/gi, "he's"], [/\bshe is\b/gi, "she's"],
]

// ============================================================
// MAIN PIPELINE
// ============================================================
const MODES = {
  light:     { split: false, combine: false, fragments: false, reorder: false, vocab: true, contractions: false },
  medium:    { split: true, combine: true, fragments: true, reorder: true, vocab: true, contractions: true },
  aggressive:{ split: true, combine: true, fragments: true, reorder: true, vocab: true, contractions: true },
}

export function humanize(text, strength = 'medium') {
  if (!text || !text.trim()) return { text: '', stats: { changes: 0 } }

  const cfg = MODES[strength]
  let changes = 0
  let result = text

  // Phase 1: Split into sentences
  let sentences = result.split(/(?<=[.!?])\s+/).filter(s => s.trim())

  // Phase 2: Structural transformations
  if (cfg.split) sentences = splitSentences(sentences, strength)
  if (cfg.combine) sentences = combineSentences(sentences)
  if (cfg.reorder) sentences = reorderInformation(sentences, strength)
  if (cfg.fragments) sentences = injectFragments(sentences, strength)

  // Phase 3: Vocabulary cleanup
  if (cfg.vocab) {
    sentences = sentences.map(s => {
      for (const [pattern, replacer] of SAFE_STARTERS) {
        const m = s.match(pattern)
        if (m) { changes++; s = s.replace(pattern, replacer(s)) }
      }
      for (const { f, r } of SAFE_WORDS) {
        const m = s.match(f)
        if (m) { changes++; s = s.replace(f, r) }
      }
      for (const p of FAKE_DEPTH) {
        const m = s.match(p)
        if (m) { changes++; s = s.replace(p, '') }
      }
      return s
    })
  }

  // Phase 4: Contractions
  if (cfg.contractions) {
    sentences = sentences.map(s => {
      for (const [f, r] of CONTRACTIONS) {
        if (f.test(s)) { changes++; s = s.replace(f, r) }
      }
      return s
    })
  }

  // Phase 5: Rebuild
  result = sentences.join(' ')

  // Phase 6: Cleanup
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
