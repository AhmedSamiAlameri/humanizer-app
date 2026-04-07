// HumanCore Engine v5.0 — Multi-Phase Humanization
// Techniques: DIPPER-style rewriting, HMGC pattern removal, ADAT semantic enhancement

// ============================================================
// PATTERN DATABASE
// ============================================================

const PATTERNS = {
  openings: [
    /^in today's\s+/gi, /^in the modern\s+/gi, /^in recent years,?\s*/gi,
    /^over the past few\s+/gi, /^in an era\s+/gi, /^in the current\s+/gi,
    /^as the world\s+/gi, /^in the age of\s+/gi, /^with the advent of\s+/gi,
    /^in the rapidly\s+/gi, /^in our ever-changing\s+/gi, /^in today's rapidly\s+/gi,
    /^in today's digital\s+/gi, /^in an increasingly\s+/gi,
  ],
  transitions: [
    /\bfurthermore,?\s*/gi, /\bmoreover,?\s*/gi, /\bin addition,?\s*/gi,
    /\badditionally,?\s*/gi, /\bconsequently,?\s*/gi, /\btherefore,?\s*/gi,
    /\bthus,?\s*/gi, /\bhence,?\s*/gi, /\bnotably,?\s*/gi,
    /\bimportantly,?\s*/gi, /\bnonetheless,?\s*/gi, /\bnevertheless,?\s*/gi,
    /\bconversely,?\s*/gi, /\bon the contrary,?\s*/gi,
    /\bmore importantly,?\s*/gi, /\babove all,?\s*/gi,
    /\bin conclusion,?\s*/gi, /\bin summary,?\s*/gi, /\bto conclude,?\s*/gi,
    /\bultimately,?\s*/gi, /\bin essence,?\s*/gi, /\bto sum up,?\s*/gi,
    /\bin brief,?\s*/gi, /\bin light of this,?\s*/gi,
    /\bwith this in mind,?\s*/gi, /\btaken together,?\s*/gi,
    /\bin other words,?\s*/gi,
  ],
  vocabulary: [
    { f: /\bdelve\b/gi, r: 'dig into' },
    { f: /\butilize\b/gi, r: 'use' },
    { f: /\bleverage\b/gi, r: 'use' },
    { f: /\bnavigate\b/gi, r: 'deal with' },
    { f: /\bnavigating\b/gi, r: 'dealing with' },
    { f: /\blandscape\b/gi, r: 'field' },
    { f: /\becosystem\b/gi, r: 'community' },
    { f: /\bholistic\b/gi, r: 'complete' },
    { f: /\bmultifaceted\b/gi, r: 'complex' },
    { f: /\bnuanced\b/gi, r: 'detailed' },
    { f: /\bcrucial\b/gi, r: 'important' },
    { f: /\bvital\b/gi, r: 'important' },
    { f: /\bpivotal\b/gi, r: 'key' },
    { f: /\bparamount\b/gi, r: 'critical' },
    { f: /\bimperative\b/gi, r: 'necessary' },
    { f: /\bmyriad\b/gi, r: 'many' },
    { f: /\bplethora\b/gi, r: 'lot' },
    { f: /\bmultitude\b/gi, r: 'lot' },
    { f: /\bseamlessly\b/gi, r: 'smoothly' },
    { f: /\bseamless\b/gi, r: 'smooth' },
    { f: /\brobust\b/gi, r: 'strong' },
    { f: /\bcomprehensive\b/gi, r: 'thorough' },
    { f: /\binnovative\b/gi, r: 'new' },
    { f: /\bcutting-edge\b/gi, r: 'advanced' },
    { f: /\bgroundbreaking\b/gi, r: 'new' },
    { f: /\brevolutionary\b/gi, r: 'major' },
    { f: /\bgame-changing\b/gi, r: 'significant' },
    { f: /\btransformative\b/gi, r: 'major' },
    { f: /\bunprecedented\b/gi, r: 'unusual' },
    { f: /\bunparalleled\b/gi, r: 'rare' },
    { f: /\bexemplary\b/gi, r: 'strong' },
    { f: /\bmeticulous\b/gi, r: 'careful' },
    { f: /\bmeticulously\b/gi, r: 'carefully' },
    { f: /\bprofound\b/gi, r: 'deep' },
    { f: /\bprofoundly\b/gi, r: 'deeply' },
    { f: /\bsignificant\b/gi, r: 'major' },
    { f: /\bsignificantly\b/gi, r: 'heavily' },
    { f: /\bsubstantial\b/gi, r: 'large' },
    { f: /\bsubstantially\b/gi, r: 'heavily' },
    { f: /\bconsiderable\b/gi, r: 'large' },
    { f: /\bconsiderably\b/gi, r: 'heavily' },
    { f: /\bremarkable\b/gi, r: 'notable' },
    { f: /\bremarkably\b/gi, r: 'notably' },
    { f: /\bextraordinary\b/gi, r: 'unusual' },
    { f: /\bexceptional\b/gi, r: 'strong' },
    { f: /\bexceptionally\b/gi, r: 'very' },
    { f: /\bintegral\b/gi, r: 'key' },
    { f: /\bindispensable\b/gi, r: 'essential' },
    { f: /\binstrumental\b/gi, r: 'key' },
    { f: /\bcornerstone\b/gi, r: 'foundation' },
    { f: /\btestament\b/gi, r: 'proof' },
    { f: /\bepitome\b/gi, r: 'best example' },
    { f: /\bparadigm\b/gi, r: 'model' },
    { f: /\bparadigm shift\b/gi, r: 'major change' },
    { f: /\bnuance\b/gi, r: 'detail' },
    { f: /\bnuances?\b/gi, r: 'details' },
    { f: /\bcomplexities?\b/gi, r: 'details' },
    { f: /\bintricacies?\b/gi, r: 'details' },
    { f: /\bimplications?\b/gi, r: 'effects' },
    { f: /\bunderscore\b/gi, r: 'show' },
    { f: /\bunderscores\b/gi, r: 'shows' },
    { f: /\bunderscored\b/gi, r: 'showed' },
    { f: /\bhighlight\b/gi, r: 'show' },
    { f: /\bhighlights\b/gi, r: 'shows' },
    { f: /\bhighlighted\b/gi, r: 'showed' },
    { f: /\bemphasize\b/gi, r: 'stress' },
    { f: /\bemphasizes\b/gi, r: 'stresses' },
    { f: /\bemphasized\b/gi, r: 'stressed' },
    { f: /\bfacilitate\b/gi, r: 'help' },
    { f: /\bfacilitates\b/gi, r: 'helps' },
    { f: /\bfacilitated\b/gi, r: 'helped' },
    { f: /\bfacilitating\b/gi, r: 'helping' },
    { f: /\bfoster\b/gi, r: 'build' },
    { f: /\bfosters\b/gi, r: 'builds' },
    { f: /\bfostered\b/gi, r: 'built' },
    { f: /\bfostering\b/gi, r: 'building' },
    { f: /\bcultivate\b/gi, r: 'develop' },
    { f: /\bcultivates\b/gi, r: 'develops' },
    { f: /\bcultivated\b/gi, r: 'developed' },
    { f: /\bcultivating\b/gi, r: 'developing' },
    { f: /\bstreamline\b/gi, r: 'simplify' },
    { f: /\bstreamlines\b/gi, r: 'simplifies' },
    { f: /\bstreamlined\b/gi, r: 'simplified' },
    { f: /\bstreamlining\b/gi, r: 'simplifying' },
    { f: /\boptimize\b/gi, r: 'improve' },
    { f: /\boptimizes\b/gi, r: 'improves' },
    { f: /\boptimized\b/gi, r: 'improved' },
    { f: /\boptimizing\b/gi, r: 'improving' },
    { f: /\benhance\b/gi, r: 'improve' },
    { f: /\benhances\b/gi, r: 'improves' },
    { f: /\benhanced\b/gi, r: 'improved' },
    { f: /\benhancing\b/gi, r: 'improving' },
    { f: /\bempower\b/gi, r: 'enable' },
    { f: /\bempowers\b/gi, r: 'enables' },
    { f: /\bempowered\b/gi, r: 'enabled' },
    { f: /\bempowering\b/gi, r: 'enabling' },
    { f: /\benable\b/gi, r: 'let' },
    { f: /\benables\b/gi, r: 'lets' },
    { f: /\benabled\b/gi, r: 'let' },
    { f: /\benabling\b/gi, r: 'letting' },
    { f: /\bensure\b/gi, r: 'make sure' },
    { f: /\bensures\b/gi, r: 'makes sure' },
    { f: /\bensured\b/gi, r: 'made sure' },
    { f: /\bspearhead\b/gi, r: 'lead' },
    { f: /\bspearheads\b/gi, r: 'leads' },
    { f: /\bpioneer\b/gi, r: 'start' },
    { f: /\bpioneers\b/gi, r: 'starts' },
    { f: /\bpioneered\b/gi, r: 'started' },
    { f: /\brevolutionize\b/gi, r: 'change' },
    { f: /\brevolutionizes\b/gi, r: 'changes' },
    { f: /\brevolutionized\b/gi, r: 'changed' },
    { f: /\btransform\b/gi, r: 'change' },
    { f: /\btransforms\b/gi, r: 'changes' },
    { f: /\btransformed\b/gi, r: 'changed' },
    { f: /\btransforming\b/gi, r: 'changing' },
    { f: /\breshape\b/gi, r: 'change' },
    { f: /\breshapes\b/gi, r: 'changes' },
    { f: /\breshaped\b/gi, r: 'changed' },
    { f: /\breshaping\b/gi, r: 'changing' },
    { f: /\bimpactful\b/gi, r: 'effective' },
    { f: /\bactionable\b/gi, r: 'useful' },
    { f: /\bdrive\b/gi, r: 'push' },
    { f: /\bdrives\b/gi, r: 'pushes' },
    { f: /\bdriving\b/gi, r: 'pushing' },
    { f: /\bfuel\b/gi, r: 'push' },
    { f: /\bfuels\b/gi, r: 'pushes' },
    { f: /\bfueled\b/gi, r: 'pushed' },
    { f: /\bfueling\b/gi, r: 'pushing' },
    { f: /\bcatalyze\b/gi, r: 'speed up' },
    { f: /\bcatalyzes\b/gi, r: 'speeds up' },
    { f: /\bpropel\b/gi, r: 'push' },
    { f: /\bpropels\b/gi, r: 'pushes' },
    { f: /\bpropelled\b/gi, r: 'pushed' },
    { f: /\bpropelling\b/gi, r: 'pushing' },
    { f: /\bsynergy\b/gi, r: '' },
    { f: /\bsynergies?\b/gi, r: '' },
    { f: /\bsynergize\b/gi, r: 'work together' },
    { f: /\bbandwidth\b/gi, r: 'time' },
    { f: /\bgoing forward\b/gi, r: 'from now on' },
    { f: /\bmoving forward\b/gi, r: 'from now on' },
    { f: /\bin the future\b/gi, r: 'later' },
    { f: /\btouch base\b/gi, r: 'check in' },
    { f: /\bcircle back\b/gi, r: 'come back' },
    { f: /\bdeep dive\b/gi, r: 'close look' },
    { f: /\bat the end of the day\b/gi, r: '' },
    { f: /\bwhen all is said and done\b/gi, r: '' },
    { f: /\bneedless to say\b/gi, r: '' },
    { f: /\bit is important to note\b/gi, r: '' },
    { f: /\bit's important to note\b/gi, r: '' },
    { f: /\bit is worth noting\b/gi, r: '' },
    { f: /\bit's worth noting\b/gi, r: '' },
    { f: /\bit should be noted\b/gi, r: '' },
    { f: /\bas mentioned\b/gi, r: '' },
    { f: /\bas noted\b/gi, r: '' },
    { f: /\bas stated\b/gi, r: '' },
    { f: /\bas previously mentioned\b/gi, r: '' },
    { f: /\bin today's world\b/gi, r: '' },
    { f: /\bin the modern era\b/gi, r: '' },
    { f: /\bin an increasingly\b/gi, r: '' },
    { f: /\bbecome increasingly\b/gi, r: 'grow' },
    { f: /\bbecoming increasingly\b/gi, r: 'growing' },
    { f: /\bplay a crucial role\b/gi, r: 'matter a lot' },
    { f: /\bplays a crucial role\b/gi, r: 'matters a lot' },
    { f: /\bplay a vital role\b/gi, r: 'matter a lot' },
    { f: /\bplays a vital role\b/gi, r: 'matters a lot' },
    { f: /\bplay a key role\b/gi, r: 'matter' },
    { f: /\bplays a key role\b/gi, r: 'matters' },
    { f: /\bplay an important role\b/gi, r: 'matter' },
    { f: /\bplays an important role\b/gi, r: 'matters' },
    { f: /\bserves as\b/gi, r: 'is' },
    { f: /\bstand as\b/gi, r: 'are' },
    { f: /\bfunction as\b/gi, r: 'are' },
    { f: /\bact as\b/gi, r: 'are' },
    { f: /\bboasts\b/gi, r: 'has' },
    { f: /\bnestled\b/gi, r: 'set' },
    { f: /\bprides itself\b/gi, r: '' },
    { f: /\bwide array\b/gi, r: 'range' },
    { f: /\bwide range\b/gi, r: 'range' },
    { f: /\bvast array\b/gi, r: 'range' },
    { f: /\bvast landscape\b/gi, r: '' },
    { f: /\brich tapestry\b/gi, r: 'mix' },
    { f: /\bvibrant tapestry\b/gi, r: 'mix' },
    { f: /\btapestry of\b/gi, r: 'mix of' },
    { f: /\bbustling\b/gi, r: 'busy' },
    { f: /\bthriving\b/gi, r: 'growing' },
    { f: /\bvibrant\b/gi, r: 'lively' },
    { f: /\bdynamic\b/gi, r: 'active' },
    { f: /\brapidly evolving\b/gi, r: 'fast-changing' },
    { f: /\bfast-paced\b/gi, r: 'fast' },
    { f: /\bever-evolving\b/gi, r: 'changing' },
    { f: /\bever-changing\b/gi, r: 'changing' },
    { f: /\bconstantly evolving\b/gi, r: 'changing' },
    { f: /\brapidly changing\b/gi, r: 'fast-changing' },
    { f: /\bshaping the future\b/gi, r: 'changing things' },
    { f: /\bcontributing to\b/gi, r: 'adding to' },
    { f: /\bdeeply rooted\b/gi, r: 'tied to' },
    { f: /\binextricably linked\b/gi, r: 'tied to' },
    { f: /\bclosely tied\b/gi, r: 'linked' },
    { f: /\bintertwined\b/gi, r: 'mixed' },
    { f: /\binterconnected\b/gi, r: 'linked' },
    { f: /\bindelible mark\b/gi, r: 'mark' },
    { f: /\benduring impact\b/gi, r: 'lasting effect' },
    { f: /\bprofound implications\b/gi, r: 'big effects' },
    { f: /\bbroader implications\b/gi, r: 'wider effects' },
    { f: /\bwider context\b/gi, r: 'bigger picture' },
    { f: /\bdeeper meaning\b/gi, r: 'real meaning' },
    { f: /\breflects broader\b/gi, r: 'matches' },
    { f: /\bpart of a larger\b/gi, r: 'part of a bigger' },
    { f: /\bstate-of-the-art\b/gi, r: 'advanced' },
    { f: /\bnext-generation\b/gi, r: 'new' },
    { f: /\bfuture-proof\b/gi, r: 'ready for what comes' },
    { f: /\bworld-class\b/gi, r: 'top' },
    { f: /\bbest-in-class\b/gi, r: 'top' },
    { f: /\bindustry-leading\b/gi, r: 'top' },
    { f: /\btransformative potential\b/gi, r: 'ability to change things' },
    { f: /\bunlocking\b/gi, r: 'opening up' },
    { f: /\bunlock\b/gi, r: 'open up' },
    { f: /\bempowerment\b/gi, r: 'support' },
    { f: /\bmake a decision\b/gi, r: 'decide' },
    { f: /\bprovide assistance\b/gi, r: 'help' },
    { f: /\bgive consideration\b/gi, r: 'consider' },
    { f: /\bmake use of\b/gi, r: 'use' },
    { f: /\btake into consideration\b/gi, r: 'consider' },
    { f: /\btake into account\b/gi, r: 'consider' },
    { f: /\befficient and effective\b/gi, r: 'efficient' },
    { f: /\brobust and reliable\b/gi, r: 'reliable' },
    { f: /\bfast and intuitive\b/gi, r: 'fast' },
    { f: /\bnot only\b(.+?)\bbut also\b/gi, r: 'both$1and' },
    { f: /\bnot just\b(.+?),\s*it's\b/gi, r: "$1 — and it's" },
    { f: /\bfrom startups to enterprises\b/gi, r: 'across the board' },
    { f: /\bfrom novice to expert\b/gi, r: 'at every level' },
    { f: /\bfrom beginners to professionals\b/gi, r: 'for everyone' },
    { f: /\bfrom small to large\b/gi, r: 'of all sizes' },
    { f: /\bexperts say\b/gi, r: 'research shows' },
    { f: /\bresearchers suggest\b/gi, r: 'studies show' },
    { f: /\bstudies show\b/gi, r: 'research shows' },
    { f: /\bmany people believe\b/gi, r: '' },
    { f: /\bit is widely thought\b/gi, r: '' },
    { f: /\bindustry observers\b/gi, r: '' },
    { f: /\baccording to some\b/gi, r: '' },
    { f: /\bsome argue that\b/gi, r: '' },
    { f: /\bit has been suggested\b/gi, r: '' },
    { f: /\bit could be argued\b/gi, r: '' },
    { f: /\bone might suggest\b/gi, r: '' },
    { f: /\bone could consider\b/gi, r: '' },
    { f: /\bin some cases\b/gi, r: '' },
    { f: /\bin certain circumstances\b/gi, r: '' },
    { f: /\bto some extent\b/gi, r: '' },
    { f: /\bit is generally accepted\b/gi, r: '' },
    { f: /\bwhile it is difficult to say\b/gi, r: '' },
    { f: /\bbased on available information\b/gi, r: '' },
    { f: /\bas of my knowledge\b/gi, r: '' },
    { f: /\bGreat question\b/gi, r: '' },
    { f: /\bCertainly\b/gi, r: '' },
    { f: /\bOf course\b/gi, r: '' },
    { f: /\bAbsolutely\b/gi, r: '' },
    { f: /\bI hope this helps\b/gi, r: '' },
    { f: /\bFeel free to let me know\b/gi, r: '' },
    { f: /\bLet me know if you'd like\b/gi, r: '' },
    { f: /\bLet's dive in\b/gi, r: '' },
    { f: /\bLet's explore\b/gi, r: '' },
    { f: /\bLet's break this down\b/gi, r: '' },
    { f: /\bWithout further ado\b/gi, r: '' },
    { f: /\bHere's what you need to know\b/gi, r: '' },
    { f: /\bIn this article,? we will\b/gi, r: '' },
    { f: /\bAs mentioned earlier\b/gi, r: '' },
    { f: /\bAs previously stated\b/gi, r: '' },
  ],
  fakeDepth: [
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
    /,\s*marking a significant step toward\s+[^.,]+/gi,
    /,\s*signaling a shift toward\s+[^.,]+/gi,
  ],
  phrases: [
    { f: /\bhas become an integral part of\b/gi, r: ['is now a key part of', 'is woven into', 'is central to'] },
    { f: /\bplays a significant role in\b/gi, r: ['matters a lot for', 'has a big effect on', 'shapes'] },
    { f: /\bhas the potential to\b/gi, r: ['could', 'might', 'can'] },
    { f: /\bit is essential to\b/gi, r: ['you need to', 'it matters that', 'we should'] },
    { f: /\bit is critical to\b/gi, r: ['you need to', 'we must', 'it matters that'] },
    { f: /\bin order to\b/gi, r: ['to', 'so you can', 'so we can'] },
    { f: /\bwith the aim of\b/gi, r: ['to', 'trying to', 'aiming to'] },
    { f: /\bfor the purpose of\b/gi, r: ['to', 'for'] },
    { f: /\bin the context of\b/gi, r: ['in', 'when it comes to', 'around'] },
    { f: /\bin the realm of\b/gi, r: ['in', 'when it comes to', 'around'] },
    { f: /\bin the field of\b/gi, r: ['in', 'when it comes to'] },
    { f: /\bin the domain of\b/gi, r: ['in', 'when it comes to'] },
    { f: /\bin the world of\b/gi, r: ['in', 'when it comes to'] },
    { f: /\bacross the globe\b/gi, r: ['worldwide', 'everywhere', 'around the world'] },
    { f: /\baround the world\b/gi, r: ['worldwide', 'everywhere', 'globally'] },
    { f: /\bin various domains\b/gi, r: ['in many areas', 'across fields', 'in different areas'] },
    { f: /\bin various industries\b/gi, r: ['in many industries', 'across sectors', 'in different fields'] },
    { f: /\bin different sectors\b/gi, r: ['in many areas', 'across fields'] },
    { f: /\boptimize complex processes\b/gi, r: ['streamline complicated workflows', 'make complex processes run better'] },
    { f: /\bnumerous applications\b/gi, r: ['many uses', 'lots of applications', 'wide range of uses'] },
    { f: /\bimproves cognitive function\b/gi, r: ['boosts brain function', 'helps your brain work better'] },
    { f: /\benhances memory retention\b/gi, r: ['improves memory', 'helps you remember things better'] },
    { f: /\bpromotes neuroplasticity\b/gi, r: ['helps the brain adapt', 'supports brain flexibility'] },
    { f: /\breduces the risk of\b/gi, r: ['lowers the chance of', 'cuts the risk of'] },
    { f: /\bneurodegenerative diseases\b/gi, r: ['brain diseases', 'conditions like dementia'] },
    { f: /\balleviate symptoms of\b/gi, r: ['ease symptoms of', 'reduce the effects of'] },
    { f: /\badequate sleep\b/gi, r: ['enough sleep', 'good sleep'] },
    { f: /\bsynergistic effect\b/gi, r: ['combined effect', 'multiplier effect'] },
    { f: /\boverall brain health\b/gi, r: ['brain health', 'how well your brain works'] },
    { f: /\bconsistent exercise\b/gi, r: ['regular exercise', 'working out regularly'] },
    { f: /\bphysical activity\b/gi, r: ['exercise', 'being active', 'physical exercise'] },
    { f: /\bmoderate exercise\b/gi, r: ['light exercise', 'moderate workouts'] },
    { f: /\bmoderate aerobic activity\b/gi, r: ['moderate cardio', 'aerobic exercise'] },
    { f: /\boptimal benefits\b/gi, r: ['the best results', 'maximum benefit'] },
    { f: /\bfor optimal\b/gi, r: ['for the best', 'to get the most'] },
    { f: /\bhas been shown to\b/gi, r: ['can', 'does', 'has been proven to'] },
    { f: /\bhave been shown to\b/gi, r: ['can', 'do', 'have been proven to'] },
    { f: /\bcannot be overstated\b/gi, r: ['matters a lot', 'is huge'] },
    { f: /\bof utmost importance\b/gi, r: ['that really matters', 'that is critical'] },
    { f: /\ba wide range of\b/gi, r: ['many', 'a range of', 'lots of'] },
    { f: /\ba growing body of\b/gi, r: ['more and more', 'a lot of'] },
    { f: /\bincreasingly being\b/gi, r: ['more often being', 'growing'] },
    { f: /\bfundamentally transforming\b/gi, r: ['changing', 'reshaping'] },
    { f: /\breshaping the way\b/gi, r: ['changing how', 'altering how'] },
    { f: /\bin a way that\b/gi, r: ['so that', 'which'] },
    { f: /\bin ways that\b/gi, r: ['so that', 'which'] },
    { f: /\bsuch that\b/gi, r: ['so that', 'which means'] },
    { f: /\bthereby\b/gi, r: ['which', 'and so', 'and'] },
    { f: /\bwhereby\b/gi, r: ['where', 'through which'] },
    { f: /\bnotwithstanding\b/gi, r: ['despite', 'even though'] },
    { f: /\bundeniably\b/gi, r: ['clearly', 'without doubt'] },
    { f: /\bindisputably\b/gi, r: ['clearly', 'without doubt'] },
    { f: /\bunquestionably\b/gi, r: ['clearly', 'for sure'] },
    { f: /\bis being used\b/gi, r: 'people use' },
    { f: /\bare being used\b/gi, r: 'people use' },
    { f: /\bwas being used\b/gi, r: 'people used' },
    { f: /\bwere being used\b/gi, r: 'people used' },
    { f: /\bhas been shown\b/gi, r: 'research shows' },
    { f: /\bhave been shown\b/gi, r: 'research shows' },
    { f: /\bis considered\b/gi, r: 'people consider' },
    { f: /\bare considered\b/gi, r: 'people consider' },
    { f: /\bis widely recognized\b/gi, r: 'people recognize' },
    { f: /\bare widely recognized\b/gi, r: 'people recognize' },
    { f: /\bwas found\b/gi, r: 'researchers found' },
    { f: /\bwere found\b/gi, r: 'researchers found' },
    { f: /\bhas been found\b/gi, r: 'researchers found' },
    { f: /\bhave been found\b/gi, r: 'researchers found' },
    { f: /\bcan be seen\b/gi, r: 'shows up' },
    { f: /\bcreating a\b/gi, r: ['building a', 'making a'] },
  ],
}

// ============================================================
// MODE CONFIGURATION
// ============================================================

const MODES = {
  light: {
    removeOpenings: true, removeTransitions: true, wordSwap: true,
    phraseRewrite: false, sentenceRestructure: false, contractions: false,
    personalityInjection: false, burstiness: false, removeFakeDepth: true,
    removeHedging: false, passiveToActive: false, naturalImperfections: false,
  },
  medium: {
    removeOpenings: true, removeTransitions: true, wordSwap: true,
    phraseRewrite: true, sentenceRestructure: true, contractions: true,
    personalityInjection: false, burstiness: true, removeFakeDepth: true,
    removeHedging: true, passiveToActive: true, naturalImperfections: false,
  },
  aggressive: {
    removeOpenings: true, removeTransitions: true, wordSwap: true,
    phraseRewrite: true, sentenceRestructure: true, contractions: true,
    personalityInjection: true, burstiness: true, removeFakeDepth: true,
    removeHedging: true, passiveToActive: true, naturalImperfections: true,
  },
}

function pick(arr) { return Array.isArray(arr) ? arr[Math.floor(Math.random() * arr.length)] : arr }

// ============================================================
// ENGINE
// ============================================================

export function humanize(text, strength = 'medium') {
  if (!text || !text.trim()) return { text: '', stats: { changes: 0 } }

  const cfg = MODES[strength]
  if (!cfg) throw new Error(`Unknown strength: ${strength}`)

  let result = text
  let changes = 0

  // Remove opening cliches
  if (cfg.removeOpenings) {
    for (const p of PATTERNS.openings) {
      const m = result.match(p)
      if (m) { changes += m.length; result = result.replace(p, '') }
    }
  }

  // Remove filler transitions
  if (cfg.removeTransitions) {
    for (const p of PATTERNS.transitions) {
      const m = result.match(p)
      if (m) { changes += m.length; result = result.replace(p, '') }
    }
  }

  // Word-level replacements
  if (cfg.wordSwap) {
    for (const { f, r } of PATTERNS.vocabulary) {
      const m = result.match(f)
      if (m) { changes += m.length; result = result.replace(f, r) }
    }
  }

  // Phrase-level rewrites
  if (cfg.phraseRewrite) {
    for (const { f, r } of PATTERNS.phrases) {
      const m = result.match(f)
      if (m) { changes += m.length; result = result.replace(f, pick(r)) }
    }
  }

  // Remove fake depth
  if (cfg.removeFakeDepth) {
    for (const p of PATTERNS.fakeDepth) {
      const m = result.match(p)
      if (m) { changes += m.length; result = result.replace(p, '') }
    }
  }

  // Remove hedging
  if (cfg.removeHedging) {
    result = result.replace(/\bpotentially\b/gi, '')
    result = result.replace(/\bpossibly\b/gi, '')
    result = result.replace(/\bperhaps\b/gi, '')
    result = result.replace(/\bmight\b/gi, '')
    result = result.replace(/\bcould\b/gi, 'can')
  }

  // Passive to active
  if (cfg.passiveToActive) {
    for (const { f, r } of PATTERNS.phrases.filter(p => p.r && typeof p.r === 'string' && (p.r.includes('people ') || p.r.includes('research ')))) {
      const m = result.match(f)
      if (m) { changes += m.length; result = result.replace(f, r) }
    }
  }

  // Smart contractions
  if (cfg.contractions) {
    const contractions = [
      [/\bdo not\b/gi, "don't"], [/\bdoes not\b/gi, "doesn't"], [/\bdid not\b/gi, "didn't"],
      [/\bis not\b/gi, "isn't"], [/\bare not\b/gi, "aren't"], [/\bwas not\b/gi, "wasn't"],
      [/\bwere not\b/gi, "weren't"], [/\bhas not\b/gi, "hasn't"], [/\bhave not\b/gi, "haven't"],
      [/\bhad not\b/gi, "hadn't"], [/\bwill not\b/gi, "won't"], [/\bwould not\b/gi, "wouldn't"],
      [/\bcould not\b/gi, "couldn't"], [/\bshould not\b/gi, "shouldn't"], [/\bcannot\b/gi, "can't"],
      [/\bit is\b/gi, "it's"], [/\bthat is\b/gi, "that's"], [/\bthere is\b/gi, "there's"],
      [/\bthey are\b/gi, "they're"], [/\bwe are\b/gi, "we're"], [/\byou are\b/gi, "you're"],
      [/\bI am\b/gi, "I'm"], [/\bhe is\b/gi, "he's"], [/\bshe is\b/gi, "she's"],
      [/\bwho is\b/gi, "who's"], [/\bwhat is\b/gi, "what's"],
    ]
    for (const [f, r] of contractions) {
      const m = result.match(f)
      if (m) { changes += m.length; result = result.replace(f, r) }
    }
  }

  // Sentence restructuring
  if (cfg.sentenceRestructure) {
    const sents = result.split(/(?<=[.!?])\s+/)
    result = sents.map(s => {
      s = s.replace(/^It is \w+ that\s+/i, m => '')
      s = s.replace(/^There (?:are|is)\s+/i, m => '')
      s = s.replace(/\bThe fact that\s+/gi, '')
      s = s.replace(/\bIn order to\b/gi, 'To')
      s = s.replace(/\bin order to\b/gi, 'to')
      return s.charAt(0).toUpperCase() + s.slice(1)
    }).join(' ')
  }

  // Burstiness
  if (cfg.burstiness) {
    const sents = result.split(/(?<=[.!?])\s+/)
    if (sents.length > 4) {
      const out = []
      let i = 0
      while (i < sents.length) {
        const w = sents[i].split(/\s+/)
        if (w.length < 8 && i + 1 < sents.length) {
          const nw = sents[i + 1].split(/\s+/)
          if (nw.length < 12) { out.push(sents[i] + ' ' + sents[i + 1]); i += 2; continue }
        }
        if (w.length > 30) {
          const mid = Math.floor(w.length / 2)
          const ci = w.lastIndexOf(',', mid)
          if (ci > 0) { out.push(w.slice(0, ci).join(' ') + '.'); out.push(w.slice(ci + 1).join(' ')) }
          else out.push(sents[i])
        } else out.push(sents[i])
        i++
      }
      result = out.join(' ')
    }
  }

  // Personality injection (aggressive only)
  if (cfg.personalityInjection) {
    const sents = result.split(/(?<=[.!?])\s+/)
    if (sents.length >= 3) {
      const inserts = ["Here's the thing.", "And it matters.", "That's the reality.", "It's not that simple, though.", "Which makes sense.", "No surprise there."]
      const out = []
      for (let i = 0; i < sents.length; i++) {
        out.push(sents[i])
        if ((i + 1) % 3 === 0 && sents[i].split(/\s+/).length > 10) out.push(pick(inserts))
      }
      result = out.join(' ')
    }
  }

  // Natural imperfections (aggressive only)
  if (cfg.naturalImperfections) {
    const sents = result.split(/(?<=[.!?])\s+/)
    if (sents.length > 3) {
      const idx = Math.floor(Math.random() * (sents.length - 2)) + 1
      if (sents[idx] && !/^(And|But|So|Or|Yet)\b/i.test(sents[idx])) {
        sents[idx] = 'But ' + sents[idx].charAt(0).toLowerCase() + sents[idx].slice(1)
      }
      result = sents.join(' ')
    }
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
    stats: { changes, originalWords: text.trim().split(/\s+/).length, humanizedWords: result.trim().split(/\s+/).length },
  }
}

export function getHumanizationStats(original, humanized) {
  const ow = original.trim().split(/\s+/).length
  const hw = humanized.trim().split(/\s+/).length
  let pf = 0
  const allPatterns = [...PATTERNS.openings, ...PATTERNS.transitions]
  for (const p of allPatterns) { const m = original.match(p); if (m) pf += m.length }
  for (const { f } of PATTERNS.vocabulary) { const m = original.match(f); if (m) pf += m.length }
  for (const { f } of PATTERNS.phrases) { const m = original.match(f); if (m) pf += m.length }
  for (const p of PATTERNS.fakeDepth) { const m = original.match(p); if (m) pf += m.length }

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

  return { originalWords: ow, humanizedWords: hw, wordChange: hw - ow, percentChange: ow > 0 ? (((hw - ow) / ow) * 100).toFixed(1) : 0, patternsFound: pf, readabilityScore: read, burstinessScore: burst }
}
