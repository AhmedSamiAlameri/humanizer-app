function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

// ============================================================
// ENHANCED HUMANIZER - Beats StealthWriter & GPTZero
// Combines Humano-style with structural transformations
// ============================================================

// Phase 1: Sentence-level filler replacements
const FILLER_INSERTIONS = [
  { pattern: /^It is important to note that\s+/i, replacements: ["Don't forget ", "Keep in mind ", "Remember that "] },
  { pattern: /^It's important to note that\s+/i, replacements: ["Don't forget ", "Keep in mind ", "Remember that "] },
  { pattern: /^Furthermore,?\s*/i, replacements: ["Interestingly, also, ", "What's more, ", "On top of that, "] },
  { pattern: /^However,?\s*/i, replacements: ["Still, ", "That said, ", "Even so, "] },
  { pattern: /^Moreover,?\s*/i, replacements: ["What's more, ", "Plus, ", "Additionally, "] },
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

// Phase 2: Extensive word swaps for perplexity
const WORD_SWAPS = [
  { f: /\bcomprehensive\b/gi, r: () => pick(['full', 'complete', 'thorough', 'detailed']) },
  { f: /\brobust\b/gi, r: () => pick(['strong', 'solid', 'reliable', 'tough']) },
  { f: /\bleverage\b/gi, r: () => pick(['use', 'make use of', 'take advantage of']) },
  { f: /\bleveraged\b/gi, r: () => pick(['used', 'put to work', 'applied']) },
  { f: /\butilize\b/gi, r: () => pick(['use']) },
  { f: /\butilized\b/gi, r: () => pick(['used']) },
  { f: /\btransformative\b/gi, r: () => pick(['major', 'significant', 'game-changing']) },
  { f: /\binnovative\b/gi, r: () => pick(['new', 'creative', 'fresh']) },
  { f: /\bseamless\b/gi, r: () => pick(['smooth', 'easy', 'effortless']) },
  { f: /\bholistic\b/gi, r: () => pick(['complete', 'full', 'overall']) },
  { f: /\bnuanced\b/gi, r: () => pick(['detailed', 'subtle', 'complex']) },
  { f: /\bmyriad\b/gi, r: () => pick(['many', 'lots of', 'numerous']) },
  { f: /\bplethora\b/gi, r: () => pick(['lot', 'bunch', 'ton']) },
  { f: /\bcrucial importance\b/gi, r: () => 'importance' },
  { f: /\bcrucial\b/gi, r: () => pick(['important', 'key']) },
  { f: /\bpivotal\b/gi, r: () => pick(['key', 'important', 'central']) },
  { f: /\bstreamline\b/gi, r: () => pick(['simplify', 'speed up', 'make easier']) },
  { f: /\boptimize\b/gi, r: () => pick(['improve', 'make better', 'fine-tune']) },
  { f: /\benhance\b/gi, r: () => pick(['improve', 'boost']) },
  { f: /\benhances\b/gi, r: () => pick(['improves', 'boosts']) },
  { f: /\bempower\b/gi, r: () => pick(['enable', 'help', 'give people the ability to']) },
  { f: /\bensure\b/gi, r: () => pick(['make sure']) },
  { f: /\bfacilitate\b/gi, r: () => pick(['help', 'support', 'make easier']) },
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
  { f: /\bserves as\b/gi, r: () => 'is' },
  { f: /\bstands as\b/gi, r: () => 'is' },
  { f: /\bfunctions as\b/gi, r: () => 'is' },
  { f: /\bacts as\b/gi, r: () => 'is' },
  { f: /\bnavigate\b/gi, r: () => pick(['deal with', 'handle', 'work through']) },
  { f: /\bnavigating\b/gi, r: () => pick(['dealing with', 'handling', 'working through']) },
  { f: /\blandscape\b/gi, r: () => pick(['field', 'area', 'space']) },
  { f: /\becosystem\b/gi, r: () => pick(['industry', 'community', 'network']) },
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

// Phase 3: Remove fake depth patterns
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

// Phase 4: Contractions
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

// ============================================================
// PHASE 5: Sentence splitting for burstiness
// ============================================================
function splitSentences(sentences, strength) {
  const out = []
  const threshold = strength === 'aggressive' ? 16 : strength === 'medium' ? 20 : 25

  for (const sent of sentences) {
    const words = sent.split(/\s+/)
    if (words.length <= threshold) {
      out.push(sent)
      continue
    }

    // Split at semicolons
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

    // Split at ", but " with capitalized second part
    let m = sent.match(/^(.{15,}?),\s+but\s+([A-Z][a-zA-Z\s',-]{5,})$/)
    if (m) { out.push(...buildSplit(m[1], m[2])); continue }

    // Split at ", and [pronoun] [verb]"
    m = sent.match(/^(.{15,}?),\s+and\s+(it|they|we|you|he|she|this|that)\s+(is|are|was|were|has|have|had|will|would|could|should|can|may|might|do|does|did|be|been|being|gets?|made?|takes?|goes?|came?|sees?|knew?|thinks?|says?|told?|gave?|finds?|works?|needs?|uses?|tries?|helps?|seems?|shows?|provides?|creates?|builds?|runs?|keeps?|turns?|brings?|starts?|continues?|allows?|leads?|includes?|remains?|reduces?|increases?|improves?|changes?|affects?|influences?|enables?|supports?|requires?|produces?|maintains?|drives?|promotes?|ensures?|represents?|establishes?|grows?|offers?|exists?|happens?|occurs?|appears?|follows?|suggests?|demonstrates?|indicates?|highlights?|emphasizes?|reflects?|addresses?|identifies?|determines?|recognizes?|understands?|explains?|describes?|analyzes?|examines?|explores?|discusses?|considers?|evaluates?|assesses?|compares?|reveals?|confirms?|reports?|notes?|observes?|measures?|calculates?|estimates?|predicts?|recommends?|proposes?|argues?|claims?|asserts?|states?|concludes?|decides?|chooses?|selects?|prefers?|wants?|hopes?|expects?|plans?|intends?|aims?|seeks?|attempts?|manages?|handles?|deals?|faces?|encounters?|experiences?|suffers?|enjoys?|loves?|likes?|hates?|fears?|worries?|cares?|matters?|concerns?|interests?|surprises?|amazes?|impresses?|satisfies?|disappoints?|frustrates?|confuses?|challenges?|threatens?|damages?|destroys?|breaks?|fixes?|solves?|resolves?|settles?|reaches?|achieves?|accomplishes?|completes?|finishes?|ends?|stops?|begins?|launches?|opens?|closes?|shuts?|locks?|fills?|empties?|covers?|hides?|reveals?|exposes?|uncovers?|discovers?|invents?|designs?|prepares?|arranges?|organizes?|sets?|puts?|places?|positions?|lays?|lies?|sits?|stands?|rises?|raises?|lifts?|drops?|falls?|throws?|catches?|holds?|grabs?|pulls?|pushes?|presses?|touches?|feels?|hears?|listens?|watches?|looks?|reads?|writes?|speaks?|talks?|says?|asks?|answers?|replies?|responds?|calls?|phones?|texts?|emails?|sends?|receives?|gets?|obtains?|acquires?|gains?|earns?|wins?|loses?|misses?|fails?|succeeds?|passes?|survives?|lives?|dies?|kills?|saves?|protects?|defends?|attacks?|fights?|battles?|competes?|races?|plays?|performs?|acts?|behaves?|reacts?|adapts?|adjusts?|modifies?|alters?|shifts?|moves?|travels?|walks?|runs?|jogs?|sprints?|dashes?|rushes?|hurries?|speeds?|accelerates?|slows?|stops?|pauses?|rests?|sleeps?|wakes?|dreams?|thinks?|imagines?|wonders?|questions?|doubts?|believes?|trusts?|accepts?|rejects?|refuses?|denies?|admits?|confesses?|acknowledges?|realizes?|notices?|recognizes?|remembers?|forgets?|recalls?|reminds?|learns?|studies?|teaches?|trains?|practices?|repeats?|reviews?|revises?|edits?|corrects?|checks?|tests?|tries?|attempts?|experiments?|explores?|investigates?|researches?|searches?|seeks?|hunts?|looks?|finds?|discovers?|detects?|spots?|notices?|observes?|watches?|monitors?|tracks?|follows?|traces?|records?|documents?|reports?|describes?|explains?|clarifies?|illustrates?|demonstrates?|shows?|displays?|presents?|exhibits?|reveals?|exposes?|uncovers?|discovers?|finds?|locates?|identifies?|recognizes?|distinguishes?|differentiates?|separates?|divides?|splits?|breaks?|cracks?|fractures?|shatters?|smashes?|crushes?|squeezes?|presses?|pushes?|shoves?|pulls?|drags?|draws?|attracts?|appeals?|interests?|fascinates?|captivates?|charms?|delights?|pleases?|satisfies?|fulfills?|completes?|finishes?|ends?|concludes?|terminates?|ceases?|stops?|quits?|leaves?|departs?|exits?|goes?|moves?|shifts?|transfers?|transports?|carries?|bears?|brings?|takes?|fetches?|delivers?|sends?|mails?|ships?|dispatches?|transmits?|broadcasts?|publishes?|releases?|issues?|distributes?|spreads?|scatters?|disperses?|diffuses?|extends?|expands?|grows?|increases?|rises?|climbs?|ascends?|mounts?|scales?|reaches?|attains?|achieves?|accomplishes?|realizes?|fulfills?|satisfies?|meets?|matches?|equals?|balances?|weighs?|measures?|calculates?|computes?|counts?|numbers?|totals?|sums?|adds?|subtracts?|multiplies?|divides?|splits?|shares?|distributes?|allocates?|assigns?|appoints?|nominates?|elects?|chooses?|selects?|picks?|decides?|determines?|resolves?|settles?|fixes?|repairs?|mends?|heals?|cures?|treats?|handles?|manages?|controls?|directs?|guides?|leads?|steers?|navigates?|pilots?|drives?|rides?|flies?|sails?|rows?|swims?|dives?|jumps?|leaps?|hops?|skips?|dances?|sings?|hums?|whistles?|plays?|performs?|acts?|stars?|features?|appears?|shows?|displays?|presents?|exhibits?|demonstrates?|illustrates?|depicts?|portrays?|represents?|symbolizes?|stands?|means?|signifies?|indicates?|suggests?|implies?|hints?|insinuates?|intimates?|communicates?|conveys?|expresses?|states?|declares?|announces?|proclaims?|publishes?|broadcasts?|reports?|relates?|recounts?|narrates?|tells?|says?|speaks?|talks?|chats?|converses?|discusses?|debates?|argues?|disputes?|contests?|challenges?|questions?|doubts?|wonders?|ponders?|considers?|contemplates?|reflects?|meditates?|thinks?|reasons?|analyzes?|examines?|inspects?|scrutinizes?|studies?|researches?|investigates?|explores?|probes?|searches?|seeks?|looks?|hunts?|tracks?|traces?|follows?|pursues?|chases?|catches?|captures?|seizes?|grabs?|grasps?|clutches?|holds?|grips?|clasps?|embraces?|hugs?|squeezes?|presses?|pushes?|shoves?|thrusts?|drives?|forces?|compels?|obliges?|requires?|demands?|insists?|urges?|presses?|encourages?|motivates?|inspires?|stimulates?|excites?|thrills?|delights?|pleases?|satisfies?|gratifies?|fulfills?|completes?|finishes?|ends?|concludes?|closes?|shuts?|seals?|locks?|secures?|fastens?|attaches?|connects?|joins?|links?|binds?|ties?|wraps?|covers?|coats?|paints?|colors?|dyes?|stains?|marks?|labels?|tags?|names?|calls?|titles?|terms?|designates?|identifies?|recognizes?|acknowledges?|accepts?|receives?|welcomes?|greets?|meets?|encounters?|faces?|confronts?|challenges?|dares?|risks?|gambles?|bets?|wagers?|stakes?|invests?|spends?|pays?|costs?|charges?|bills?|invoicing?|prices?|values?|estimates?|assesses?|evaluates?|judges?|rates?|ranks?|grades?|scores?|marks?|checks?|tests?|examines?|inspects?|reviews?|audits?|surveys?|polls?|questions?|interviews?|asks?|inquires?|queries?|requests?|demands?|orders?|commands?|directs?|instructs?|teaches?|educates?|trains?|coaches?|tutors?|guides?|advises?|counsels?|consults?|discusses?|talks?|speaks?|says?|tells?|informs?|notifies?|alerts?|warns?|cautions?|advises?|recommends?|suggests?|proposes?|offers?|presents?|submits?|provides?|supplies?|furnishes?|delivers?|gives?|grants?|awards?|bestows?|confers?|presents?|hands?|passes?|transfers?|conveys?|communicates?|expresses?|shows?|demonstrates?|displays?|exhibits?|presents?|reveals?|exposes?|uncovers?|discloses?|divulges?|confesses?|admits?|acknowledges?|recognizes?|accepts?|agrees?|consents?|approves?|endorses?|supports?|backs?|champions?|advocates?|promotes?|advances?|furthers?|helps?|aids?|assists?|serves?|benefits?|profits?|gains?|earns?|wins?|achieves?|accomplishes?|attains?|reaches?|obtains?|secures?|acquires?|gets?|procures?|purchases?|buys?|shops?|orders?|books?|reserves?|saves?|stores?|keeps?|retains?|holds?|maintains?|preserves?|protects?|defends?|guards?|shields?|shelters?|covers?|hides?|conceals?|masks?|disguises?|camouflages?|veils?|cloaks?|screens?|blocks?|obstructs?|hinders?|impedes?|prevents?|stops?|halts?|ceases?|ends?|finishes?|completes?|concludes?|terminates?|closes?|shuts?|seals?|locks?|secures?|fastens?|attaches?|connects?|joins?|links?|binds?|ties?)\b/i)
    if (m) { out.push(...buildSplit(m[1], m[2] + ' ' + m[3])); continue }

    // Split at ", as [capitalized noun phrase] [verb]"
    m = sent.match(/^(.{15,}?),\s+as\s+([A-Z][a-zA-Z\s',-]{8,})\s+(continue|remain|persist|grow|increase|decrease|decline|rise|fall|drop|surge|plunge|soar|plummet|fluctuate|vary|shift|change|evolve|develop|emerge|arise|appear|occur|happen|take place|come about|come up|come forward|come into|come to|come from|come with|come without|come across|come along|come around|come back|come down|come in|come off|come on|come out|come over|come through|come up|come under)\b/i)
    if (m) { out.push(...buildSplit(m[1], m[2] + ' ' + m[3])); continue }

    // Split at ", while [capitalized]"
    m = sent.match(/^(.{15,}?),\s+while\s+([A-Z][a-zA-Z\s',-]{5,})$/)
    if (m) { out.push(...buildSplit(m[1], 'While ' + m[2])); continue }

    // Split at ", which [verb]"
    m = sent.match(/^(.{15,}?),\s+which\s+(is|are|was|were|has|have|had|will|would|could|should|can|may|might)\s+([a-zA-Z\s',-]{5,})$/i)
    if (m) { out.push(...buildSplit(m[1], 'This ' + m[2] + ' ' + m[3])); continue }

    out.push(sent)
  }
  return out
}

function buildSplit(first, second) {
  first = first.trim()
  second = second.trim()
  if (!first.endsWith('.')) first += '.'
  if (!second.match(/[.!?]$/)) second += '.'
  return [first, second]
}

// ============================================================
// PHASE 6: Combine very short sentences
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
// PHASE 7: Information reordering (DIPPER-style)
// ============================================================
function reorderInformation(sentences, strength) {
  if (strength === 'light') return sentences

  const out = []
  for (const sent of sentences) {
    let done = false

    // "Research/Studies has/have shown that X" → "X, research shows"
    if (!done) {
      const m = sent.match(/^(Research|Studies|Evidence|Data)\s+(has|have)\s+(shown|found|demonstrated|indicated)\s+(that\s+)?(.+)$/i)
      if (m && Math.random() < 0.7) {
        let ending = m[5].replace(/\.$/, '')
        out.push(`${ending.charAt(0).toUpperCase() + ending.slice(1)} — ${m[1].toLowerCase()} ${m[2]} ${m[3]}.`)
        done = true
      }
    }

    // "X plays a crucial/key/important role in Y" → "Y depends on X"
    if (!done) {
      const m = sent.match(/^(.+?)\s+plays\s+(a\s+)?(crucial|key|significant|important|vital|major)\s+role\s+in\s+(.+)$/i)
      if (m && Math.random() < 0.6) {
        let y = m[4].replace(/\.$/, '')
        out.push(`${y.charAt(0).toUpperCase() + y.slice(1)} depends on ${m[1].toLowerCase()}.`)
        done = true
      }
    }

    if (!done) out.push(sent)
  }
  return out
}

// ============================================================
// PHASE 8: Add natural imperfections
// ============================================================
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

// ============================================================
// PHASE 9: Add short reaction sentences
// ============================================================
function addReactions(sentences, strength) {
  const out = [...sentences]
  const count = strength === 'aggressive' ? Math.max(1, Math.floor(sentences.length / 3)) :
                strength === 'medium' ? Math.max(1, Math.floor(sentences.length / 4)) :
                0

  if (count === 0) return out

  const reactions = [
    'Exactly.',
    "Don't forget.",
    'Keep in mind.',
    'Think about it.',
    "It's true.",
    'No surprise there.',
    'Makes sense, right?',
    "That's the thing.",
    "Here's the thing.",
    "It's worth noting.",
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
// MAIN PIPELINE
// ============================================================
const MODES = {
  light:     { split: false, combine: false, fillers: true, words: true, reorder: false, fakeDepth: false, contractions: false, imperfections: false, reactions: false },
  medium:    { split: true, combine: true, fillers: true, words: true, reorder: true, fakeDepth: true, contractions: true, imperfections: false, reactions: true },
  aggressive:{ split: true, combine: true, fillers: true, words: true, reorder: true, fakeDepth: true, contractions: true, imperfections: true, reactions: true },
}

export function humanize(text, strength = 'medium') {
  if (!text || !text.trim()) return { text: '', stats: { changes: 0 } }

  const cfg = MODES[strength]
  let changes = 0

  // Phase 1: Split into sentences
  let sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim())

  // Phase 2: Sentence splitting for burstiness
  if (cfg.split) sentences = splitSentences(sentences, strength)

  // Phase 3: Combine short sentences
  if (cfg.combine) sentences = combineSentences(sentences)

  // Phase 4: Information reordering
  if (cfg.reorder) sentences = reorderInformation(sentences, strength)

  // Phase 5: Filler replacements
  if (cfg.fillers) {
    sentences = sentences.map(s => {
      for (const { pattern, replacements } of FILLER_INSERTIONS) {
        const sentencePattern = new RegExp(pattern.source, pattern.flags.includes('i') ? 'i' : '')
        const m = s.match(sentencePattern)
        if (m) { changes++; return s.replace(sentencePattern, pick(replacements)) }
      }
      return s
    })
  }

  // Phase 6: Word swaps
  if (cfg.words) {
    sentences = sentences.map(s => {
      for (const { f, r } of WORD_SWAPS) {
        const m = s.match(f)
        if (m) { changes++; s = s.replace(f, typeof r === 'function' ? r() : r) }
      }
      return s
    })
  }

  // Phase 7: Remove fake depth
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

  // Phase 8: Contractions
  if (cfg.contractions) {
    sentences = sentences.map(s => {
      for (const [f, r] of CONTRACTIONS) {
        if (f.test(s)) { changes++; s = s.replace(f, r) }
      }
      return s
    })
  }

  // Phase 9: Imperfections
  if (cfg.imperfections) {
    sentences = addImperfections(sentences, strength)
  }

  // Phase 10: Reactions
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
