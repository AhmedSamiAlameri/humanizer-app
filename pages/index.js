import { useState } from 'react'
import Head from 'next/head'
import { humanize, getHumanizationStats } from '../lib/humanizer'
import styles from '../styles/humanizer.module.css'

const MODES = [
  { id: 'light', label: 'Light', desc: 'Minor polish, fix worst AI patterns' },
  { id: 'balanced', label: 'Balanced', desc: 'Full humanization, strong rewrite' },
  { id: 'aggressive', label: 'Aggressive', desc: 'Deep rewrite, voice injection' },
  { id: 'academic', label: 'Academic', desc: 'Formal register, scholarly tone' },
  { id: 'casual', label: 'Casual', desc: 'Conversational, relaxed tone' },
  { id: 'technical', label: 'Technical', desc: 'Preserve jargon, direct & precise' },
]

const EXAMPLES = [
  {
    label: 'AI Marketing Copy',
    text: "In today's rapidly evolving technological landscape, artificial intelligence serves as a transformative force that is reshaping industries across the globe. It is important to note that AI tools are increasingly being leveraged by organizations to streamline operations, enhance productivity, and foster innovation. From small startups to large enterprises, businesses of all sizes are navigating the complexities of AI adoption, highlighting the need for robust frameworks and comprehensive strategies that ensure responsible deployment.",
  },
  {
    label: 'AI Essay',
    text: "Social media has become an integral part of modern society, fundamentally transforming how individuals communicate, share information, and build relationships. It is worth noting that platforms like Facebook, Twitter, and Instagram serve as powerful tools for connecting people across geographical boundaries, thereby fostering a sense of global community. However, it is crucial to acknowledge that these platforms also present significant challenges, including the spread of misinformation, cyberbullying, and the erosion of privacy. Experts say that while social media offers unprecedented opportunities for engagement, it is important to note that users must navigate these digital landscapes with caution and critical thinking.",
  },
  {
    label: 'AI Business Text',
    text: "Our company is committed to delivering cutting-edge solutions that empower businesses to leverage their full potential. We utilize a robust and comprehensive approach to ensure seamless integration of innovative technologies. Our team of industry-leading experts will work closely with your organization to streamline operations and drive impactful results. Let's dive in and explore how we can transform your business.",
  },
]

export default function Humanizer() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('balanced')
  const [stats, setStats] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showCompare, setShowCompare] = useState(false)
  const [showDebug, setShowDebug] = useState(false)

  const handleHumanize = () => {
    if (!input.trim()) return

    setIsProcessing(true)

    setTimeout(() => {
      const { text, stats: engineStats } = humanize(input, mode)
      setOutput(text)
      setStats(getHumanizationStats(input, text))
      setIsProcessing(false)
    }, 400)
  }

  const handleCopy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setStats(null)
    setShowCompare(false)
    setShowDebug(false)
  }

  const handleExample = (text) => {
    setInput(text)
    setOutput('')
    setStats(null)
  }

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0

  return (
    <>
      <Head>
        <title>Humanizer — Make AI Text Sound Human</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
            <div>
              <h1 className={styles.logoText}>Humanizer</h1>
              <p className={styles.logoSub}>7-pass engine. 6 modes. Real human writing.</p>
            </div>
          </div>
        </header>

        <div className={styles.toolbar}>
          <div className={styles.modeSelector}>
            {MODES.map((m) => (
              <button
                key={m.id}
                className={`${styles.modeBtn} ${mode === m.id ? styles.modeActive : ''}`}
                onClick={() => setMode(m.id)}
                title={m.desc}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className={styles.examples}>
            <span className={styles.examplesLabel}>Try:</span>
            {EXAMPLES.map((ex, i) => (
              <button key={i} className={styles.exampleBtn} onClick={() => handleExample(ex.text)}>
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.editor}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>AI Input</span>
              <div className={styles.panelMeta}>
                {wordCount > 0 && <span className={styles.wordCount}>{wordCount} words</span>}
                <button className={styles.clearBtn} onClick={handleClear}>Clear</button>
              </div>
            </div>
            <textarea
              className={styles.textarea}
              placeholder="Paste your AI-generated text here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
            />
          </div>

          <div className={styles.actions}>
            <button
              className={`${styles.humanizeBtn} ${!input.trim() || isProcessing ? styles.disabled : ''}`}
              onClick={handleHumanize}
              disabled={!input.trim() || isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className={styles.spinner} />
                  Humanizing...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  Humanize
                </>
              )}
            </button>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>Human Output</span>
              <div className={styles.panelMeta}>
                {output && (
                  <>
                    <button className={styles.debugBtn} onClick={() => setShowDebug(!showDebug)}>
                      {showDebug ? 'Hide Debug' : 'Debug'}
                    </button>
                    <button className={styles.compareBtn} onClick={() => setShowCompare(!showCompare)}>
                      {showCompare ? 'Hide' : 'Compare'}
                    </button>
                    <button className={styles.copyBtn} onClick={handleCopy}>
                      {copied ? '✓ Copied' : 'Copy'}
                    </button>
                  </>
                )}
              </div>
            </div>
            {output ? (
              showCompare ? (
                <div className={styles.compareView}>
                  <div className={styles.compareCol}>
                    <span className={styles.compareLabel}>Original</span>
                    <pre className={styles.compareText}>{input}</pre>
                  </div>
                  <div className={styles.compareDivider} />
                  <div className={styles.compareCol}>
                    <span className={styles.compareLabel}>Humanized</span>
                    <pre className={styles.compareText}>{output}</pre>
                  </div>
                </div>
              ) : (
                <div className={styles.outputText}>{output}</div>
              )
            ) : (
              <div className={styles.placeholder}>Your humanized text will appear here...</div>
            )}
          </div>
        </div>

        {stats && (
          <div className={styles.statsBar}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{stats.patternsRemoved}</span>
              <span className={styles.statLabel}>AI Patterns Removed</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{stats.originalWords} → {stats.humanizedWords}</span>
              <span className={styles.statLabel}>Word Count</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{stats.percentChange > 0 ? '+' : ''}{stats.percentChange}%</span>
              <span className={styles.statLabel}>Length Change</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{stats.readabilityScore}</span>
              <span className={styles.statLabel}>Readability</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{stats.burstinessScore}</span>
              <span className={styles.statLabel}>Burstiness</span>
            </div>
          </div>
        )}

        {showDebug && stats && (
          <div className={styles.debugPanel}>
            <h3 className={styles.debugTitle}>Processing Details</h3>
            <div className={styles.debugGrid}>
              <div className={styles.debugSection}>
                <h4>Patterns by Category</h4>
                <ul className={styles.debugList}>
                  <li><span>Inflation Bloat</span><span>{countCategory(input, 'inflation')}</span></li>
                  <li><span>Promotional Language</span><span>{countCategory(input, 'promotional')}</span></li>
                  <li><span>AI Vocabulary</span><span>{countCategory(input, 'vocabulary')}</span></li>
                  <li><span>Fake Depth Phrases</span><span>{countCategory(input, 'fakedepth')}</span></li>
                  <li><span>Vague Attribution</span><span>{countCategory(input, 'attribution')}</span></li>
                  <li><span>Structural Tells</span><span>{countCategory(input, 'structural')}</span></li>
                  <li><span>Excessive Hedging</span><span>{countCategory(input, 'hedging')}</span></li>
                  <li><span>Chatbot Artifacts</span><span>{countCategory(input, 'chatbot')}</span></li>
                  <li><span>Rhythm Problems</span><span>{countCategory(input, 'rhythm')}</span></li>
                  <li><span>Punctuation Issues</span><span>{countCategory(input, 'punctuation')}</span></li>
                </ul>
              </div>
              <div className={styles.debugSection}>
                <h4>Meaning Lock</h4>
                <div className={styles.meaningLock}>
                  <p>Claims extracted: <strong>{input.split(/[.!?]+/).filter(s => s.trim().length > 10).length}</strong></p>
                  <p>Named entities: <strong>{(input.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+\b/g) || []).length}</strong></p>
                  <p>Numbers preserved: <strong>{(input.match(/\d+(?:[,.]\d+)?%?/g) || []).length}</strong></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

function countCategory(text, category) {
  const patterns = {
    inflation: [
      /\bserves as\b/gi, /\bstands as\b/gi, /\bfunctions as\b/gi, /\bacts as\b/gi,
      /\btestament to\b/gi, /\bpivotal moment\b/gi, /\bwatershed moment\b/gi,
      /\bevolving landscape\b/gi, /\brapidly changing world\b/gi, /\bever-changing\b/gi,
      /\bbroader implications\b/gi, /\bunderscores\b/gi, /\bhighlights\b/gi,
      /\bindelible mark\b/gi, /\benduring impact\b/gi, /\bcontributing to the\b/gi,
      /\bshaping the future of\b/gi, /\bdeeply rooted in\b/gi, /\binextricably linked to\b/gi,
    ],
    promotional: [
      /\bgroundbreaking\b/gi, /\brevolutionary\b/gi, /\bgame-changing\b/gi,
      /\bcutting-edge\b/gi, /\binnovative\b/gi, /\bseamless\b/gi, /\bintuitive\b/gi,
      /\brobust\b/gi, /\bcomprehensive\b/gi, /\bworld-class\b/gi, /\bbest-in-class\b/gi,
      /\bindustry-leading\b/gi, /\btransformative potential\b/gi, /\bempowering\b/gi,
      /\ba wide array of\b/gi, /\ba plethora of\b/gi, /\ba myriad of\b/gi,
      /\bstate-of-the-art\b/gi, /\bnext-generation\b/gi,
    ],
    vocabulary: [
      /\bdelve\b/gi, /\butilize\b/gi, /\bleverage\b/gi, /\bnavigate\b/gi,
      /\bholistic\b/gi, /\bmultifaceted\b/gi, /\bnuanced\b/gi,
      /\bin today's world\b/gi, /\bin the modern era\b/gi,
      /\bit is important to note that\b/gi, /\bit is worth noting that\b/gi,
      /\bneedless to say\b/gi, /\bat the end of the day\b/gi,
      /\bgoing forward\b/gi, /\bmoving forward\b/gi, /\bsynergy\b/gi,
      /\bimpactful\b/gi, /\bactionable\b/gi, /\bstreamline\b/gi,
      /\bempower\b/gi, /\bensure\b/gi, /\bfacilitate\b/gi,
      /\bcrucial\b/gi, /\bvital\b/gi,
    ],
    fakedepth: [
      /,\s*highlighting\s+/gi, /,\s*underscoring\s+/gi, /,\s*symbolizing\s+/gi,
      /,\s*representing\s+/gi, /,\s*reflecting\s+/gi, /,\s*contributing\s+/gi,
      /,\s*fostering\s+/gi, /,\s*cultivating\s+/gi, /,\s*showcasing\s+/gi,
      /,\s*demonstrating\s+/gi,
    ],
    attribution: [
      /\bexperts say\b/gi, /\bresearchers suggest\b/gi, /\bstudies show\b/gi,
      /\bmany people believe\b/gi, /\bit is widely thought\b/gi,
      /\bindustry observers\b/gi, /\baccording to some\b/gi,
      /\bsome argue that\b/gi, /\bit has been suggested\b/gi,
    ],
    structural: [
      /\bnot only\b.*\bbut also\b/gi, /\bnot just\b.*\bit's\b/gi,
      /\bmake a decision\b/gi, /\bprovide assistance\b/gi,
      /\bgive consideration to\b/gi, /\bmake use of\b/gi,
      /\btake into consideration\b/gi, /\btake into account\b/gi,
      /\befficient and effective\b/gi, /\brobust and reliable\b/gi,
    ],
    hedging: [
      /\bit could be argued\b/gi, /\bone might suggest\b/gi,
      /\bin some cases\b/gi, /\bin certain circumstances\b/gi,
      /\bto some extent\b/gi, /\bit is generally accepted\b/gi,
      /\bbased on available information\b/gi,
    ],
    chatbot: [
      /\bGreat question\b/gi, /\bCertainly\b/gi, /\bOf course\b/gi,
      /\bAbsolutely\b/gi, /\bI hope this helps\b/gi,
      /\bFeel free to let me know\b/gi, /\bLet's dive in\b/gi,
      /\bLet's explore\b/gi, /\bWithout further ado\b/gi,
      /\bHere's what you need to know\b/gi, /\bAs mentioned earlier\b/gi,
    ],
    rhythm: [
      /^\s*In conclusion/gim, /^\s*In summary/gim, /^\s*To sum up/gim,
      /^\s*Moreover/gim, /^\s*Furthermore/gim, /^\s*Additionally/gim,
      /^\s*In today's/gim,
    ],
    punctuation: [],
  }

  if (category === 'punctuation') {
    const dashCount = (text.match(/—/g) || []).length
    return dashCount > 1 ? dashCount - 1 : 0
  }

  let count = 0
  for (const pattern of patterns[category] || []) {
    const matches = text.match(pattern)
    if (matches) count += matches.length
  }
  return count
}
