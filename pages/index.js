import { useState, useRef } from 'react'
import Head from 'next/head'
import { humanize, getHumanizationStats } from '../lib/humanizer'
import styles from '../styles/humanizer.module.css'

const MODES = [
  { id: 'light', label: 'Light', icon: '🪶', desc: 'Minor polish' },
  { id: 'medium', label: 'Medium', icon: '⚡', desc: 'Full rewrite' },
  { id: 'aggressive', label: 'Aggressive', icon: '🔥', desc: 'Deep rewrite' },
]

const EXAMPLES = [
  {
    label: 'Exercise & Health',
    text: "Studies indicate that consistent exercise significantly improves cognitive function over time. Regular physical activity enhances memory retention and promotes neuroplasticity. It reduces the risk of neurodegenerative diseases substantially. Furthermore, even moderate exercise has been shown to alleviate symptoms of anxiety and depression. Researchers recommend at least 150 minutes of moderate aerobic activity per week for optimal benefits. Combining physical exercise with adequate sleep creates a synergistic effect on overall brain health.",
  },
  {
    label: 'AI Technology',
    text: "In today's rapidly evolving technological landscape, artificial intelligence serves as a transformative force that is reshaping industries across the globe. It is important to note that AI tools are increasingly being leveraged by organizations to streamline operations, enhance productivity, and foster innovation. From small startups to large enterprises, businesses of all sizes are navigating the complexities of AI adoption, highlighting the need for robust frameworks and comprehensive strategies that ensure responsible deployment.",
  },
  {
    label: 'Social Media',
    text: "Social media has become an integral part of modern society, fundamentally transforming how individuals communicate, share information, and build relationships. It is worth noting that platforms like Facebook, Twitter, and Instagram serve as powerful tools for connecting people across geographical boundaries, thereby fostering a sense of global community. However, it is crucial to acknowledge that these platforms also present significant challenges, including the spread of misinformation, cyberbullying, and the erosion of privacy. Experts say that while social media offers unprecedented opportunities for engagement, it is important to note that users must navigate these digital landscapes with caution and critical thinking.",
  },
]

export default function Humanizer() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('medium')
  const [stats, setStats] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showCompare, setShowCompare] = useState(false)
  const outputRef = useRef(null)

  const handleHumanize = () => {
    if (!input.trim()) return
    setProcessing(true)
    setTimeout(() => {
      const { text } = humanize(input, mode)
      setOutput(text)
      setStats(getHumanizationStats(input, text))
      setProcessing(false)
    }, 500)
  }

  const handleCopy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0

  return (
    <>
      <Head>
        <title>Humanizer — Make AI Text Sound Human</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.container}>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroBg} />
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              Free & Open Source
            </div>
            <h1 className={styles.heroTitle}>
              Make AI writing<br />
              <span className={styles.heroGradient}>sound human.</span>
            </h1>
            <p className={styles.heroSub}>
              Paste AI-generated text. Get back natural, human-sounding writing in seconds.
              No fluff. No detection flags. Just clean text.
            </p>
            <a href="#editor" className={styles.heroCta}>
              Start Humanizing
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
              </svg>
            </a>
          </div>
        </section>

        {/* FEATURES */}
        <section className={styles.features}>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h3>Multi-Phase Engine</h3>
              <p>3-pass processing: pattern removal, structural rewrite, and voice injection. Each pass strips away more AI tells.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3>Instant Results</h3>
              <p>Get humanized text back in under a second. No API calls, no waiting. Everything runs locally in your browser.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Passes Detection</h3>
              <p>Removes 200+ AI fingerprint patterns. Varies sentence rhythm. Injects natural imperfections that detectors expect from humans.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                </svg>
              </div>
              <h3>3 Strength Levels</h3>
              <p>Light for minor polish, Medium for full rewrite, Aggressive for deep transformation. Pick what fits your content.</p>
            </div>
          </div>
        </section>

        {/* EDITOR */}
        <section id="editor" className={styles.editorSection}>
          <div className={styles.editorHeader}>
            <div>
              <h2 className={styles.editorTitle}>Humanize your text</h2>
              <p className={styles.editorSub}>Paste AI text, pick a strength, and hit the button.</p>
            </div>
            <div className={styles.modeSelector}>
              {MODES.map((m) => (
                <button
                  key={m.id}
                  className={`${styles.modeBtn} ${mode === m.id ? styles.modeActive : ''}`}
                  onClick={() => setMode(m.id)}
                >
                  <span>{m.icon}</span> {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Examples */}
          <div className={styles.examples}>
            <span className={styles.examplesLabel}>Try an example →</span>
            {EXAMPLES.map((ex, i) => (
              <button key={i} className={styles.exampleBtn} onClick={() => { setInput(ex.text); setOutput(''); setStats(null) }}>
                {ex.label}
              </button>
            ))}
          </div>

          <div className={styles.editor}>
            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelTitle}>AI Input</span>
                <div className={styles.panelMeta}>
                  {wordCount > 0 && <span className={styles.wordCount}>{wordCount} words</span>}
                  <button className={styles.clearBtn} onClick={() => { setInput(''); setOutput(''); setStats(null) }}>Clear</button>
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
                className={`${styles.humanizeBtn} ${!input.trim() || processing ? styles.disabled : ''}`}
                onClick={handleHumanize}
                disabled={!input.trim() || processing}
              >
                {processing ? (
                  <><span className={styles.spinner} /> Processing...</>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
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
                        {showCompare ? 'Single' : 'Compare'}
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
                <div className={styles.placeholder}>Your humanized text appears here...</div>
              )}
            </div>
          </div>

          {/* Stats */}
          {stats && (
            <div className={styles.statsBar}>
              <div className={styles.stat}>
                <span className={styles.statValue}>{stats.patternsFound}</span>
                <span className={styles.statLabel}>AI Patterns Found & Removed</span>
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
        </section>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <p>Built with Next.js. Runs entirely in your browser — no data leaves your machine.</p>
        </footer>
      </div>
    </>
  )
}
