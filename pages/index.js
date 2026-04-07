import { useState } from 'react'
import Head from 'next/head'
import { humanize, getHumanizationStats } from '../lib/humanizer'
import styles from '../styles/humanizer.module.css'

const MODES = [
  { id: 'light', label: 'Light', desc: 'Minor polish, fix worst AI patterns' },
  { id: 'balanced', label: 'Balanced', desc: 'Full humanization, strong rewrite' },
  { id: 'aggressive', label: 'Aggressive', desc: 'Deep rewrite, voice injection' },
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

  const handleHumanize = () => {
    if (!input.trim()) return

    setIsProcessing(true)

    // Simulate processing delay for UX
    setTimeout(() => {
      const result = humanize(input, mode)
      setOutput(result)
      setStats(getHumanizationStats(input, result))
      setIsProcessing(false)
    }, 600)
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
              <p className={styles.logoSub}>Transform AI text into natural human writing</p>
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
            <span className={styles.examplesLabel}>Try an example:</span>
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
          </div>
        )}
      </div>
    </>
  )
}
