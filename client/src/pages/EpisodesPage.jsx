import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import './EpisodesPage.css'

const SERIES_LINKS = {
  1: { plex: 'https://watch.plex.tv/show/ben-10/season/1',      tubi: 'https://tubitv.com/series/300019074/ben-10' },
  2: { plex: 'https://watch.plex.tv/show/ben-10-alien-force',    tubi: 'https://tubitv.com/series/300019074/ben-10' },
  3: { plex: 'https://watch.plex.tv/show/ben-10-ultimate-alien', tubi: 'https://tubitv.com/series/300019074/ben-10' },
  4: { plex: 'https://watch.plex.tv/show/ben-10-omniverse',      tubi: 'https://tubitv.com/series/300019074/ben-10' },
}

const EpisodesPage = () => {
  const [series, setSeries]   = useState([])
  const [active, setActive]   = useState(0)
  const [playing, setPlaying] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/episodes').then(({ data }) => { setSeries(data); setLoading(false) })
  }, [])

  if (loading) return (
    <div className="ep-loading">
      <div className="ep-spinner" />
    </div>
  )

  if (!series.length) return null

  const s     = series[active]
  const links = SERIES_LINKS[s.seriesNumber] || SERIES_LINKS[1]

  return (
    <div className="ep-page">

      {/* Header */}
      <div className="ep-header">
        <p className="ep-label">— The Ben 10 Saga —</p>
        <h1 className="ep-title">Series &amp; Episodes</h1>
        <p className="ep-sub">Four legendary series. One epic universe.</p>
      </div>

      {/* Series Tabs */}
      <div className="ep-tabs">
        {series.map((ep, i) => (
          <button key={ep._id}
            className={`ep-tab ${active === i ? 'active' : ''}`}
            onClick={() => setActive(i)}
            style={active === i ? { borderColor: ep.color, boxShadow: `0 0 20px ${ep.color}33` } : {}}>
            <span className="ep-tab-num">0{ep.seriesNumber}</span>
            <span className="ep-tab-title" style={active === i ? { color: ep.color } : {}}>
              {ep.seriesTitle}
            </span>
            <span className="ep-tab-year">{ep.year}</span>
          </button>
        ))}
      </div>

      {/* Detail Panel */}
      <motion.div key={active} className="ep-detail"
        style={{ borderColor: s.color + '22' }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}>

        {/* Left — series info */}
        <div className="ep-info">
          <div className="ep-meta">
            <span className="ep-badge" style={{ background: s.color, color: '#000' }}>{s.badge}</span>
            <span className="ep-count">{s.totalEpisodes} Episodes</span>
          </div>
          <h2 className="ep-series-title" style={{ color: s.color }}>{s.seriesTitle}</h2>
          <p className="ep-desc">{s.description}</p>

          <div>
            <p className="ep-watch-label">Watch Free Online</p>
            <div className="ep-watch-links">
              <a href={links.plex} target="_blank" rel="noopener noreferrer" className="ep-watch-link">
                <span className="ep-wl-icon">🎞️</span>
                <div className="ep-wl-text">
                  <p className="ep-wl-name">Watch on Plex</p>
                  <p className="ep-wl-sub">Free • No signup needed</p>
                </div>
                <svg className="ep-wl-arrow" width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </a>
              <a href={links.tubi} target="_blank" rel="noopener noreferrer" className="ep-watch-link">
                <span className="ep-wl-icon">📺</span>
                <div className="ep-wl-text">
                  <p className="ep-wl-name">Watch on Tubi</p>
                  <p className="ep-wl-sub">Free • Ad supported</p>
                </div>
                <svg className="ep-wl-arrow" width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right — episode list */}
        <div>
          <p className="ep-list-label">Must-Watch Episodes</p>
          {s.highlights?.map((ep, i) => (
            <motion.div key={ep} className="ep-row"
              style={{ borderLeftColor: s.color, borderLeftWidth: 2 }}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setPlaying({ title: ep, seriesNumber: s.seriesNumber, seriesTitle: s.seriesTitle, color: s.color })}>
              <span className="ep-row-num" style={{ color: s.color }}>
                EP.{String(i + 1).padStart(2, '0')}
              </span>
              <span className="ep-row-title">{ep}</span>
              <div className="ep-play-btn" style={{ borderColor: s.color + '55', background: s.color + '15' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"
                  style={{ color: s.color, marginLeft: 2 }}>
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="ep-timeline">
        {series.map((ep, i) => (
          <div key={ep._id} className="ep-tl-item" onClick={() => setActive(i)}>
            <div className="ep-tl-dot"
              style={{ background: active === i ? ep.color : 'rgba(255,255,255,0.15)',
                boxShadow: active === i ? `0 0 12px ${ep.color}` : 'none' }} />
            {i < series.length - 1 && <div className="ep-tl-line" />}
            <span className="ep-tl-year">{ep.year.split('–')[0]}</span>
          </div>
        ))}
      </div>

      {/* Where to Watch Modal */}
      <AnimatePresence>
        {playing && (
          <motion.div className="ep-modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setPlaying(null)}>

            <motion.div className="ep-modal"
              style={{ border: `1px solid ${playing.color}33`,
                boxShadow: `0 30px 80px rgba(0,0,0,0.7), 0 0 60px ${playing.color}18` }}
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1,    opacity: 1, y: 0  }}
              exit={{    scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}>

              <div className="ep-modal-bar"
                style={{ background: `linear-gradient(90deg, ${playing.color}, ${playing.color}44)` }} />

              <div className="ep-modal-head">
                <div>
                  <div className="ep-modal-series">
                    <span className="ep-modal-dot" style={{ background: playing.color }} />
                    <span className="ep-modal-series-name" style={{ color: playing.color }}>
                      {playing.seriesTitle}
                    </span>
                  </div>
                  <h3 className="ep-modal-title">{playing.title}</h3>
                </div>
                <button className="ep-modal-close" onClick={() => setPlaying(null)}>✕</button>
              </div>

              <div className="ep-modal-body">
                <p className="ep-modal-hint">
                  Full episodes aren't directly embeddable — choose a platform below:
                </p>

                {[
                  { label: 'Watch on Plex',   sub: 'Free · No account required', icon: '🎞️', color: '#e5a00d',
                    url: SERIES_LINKS[playing.seriesNumber]?.plex },
                  { label: 'Watch on Tubi',   sub: 'Free · Ad supported',         icon: '📺', color: '#fa5007',
                    url: SERIES_LINKS[playing.seriesNumber]?.tubi },
                  { label: `Search "${playing.title}" on YouTube`, sub: 'Fan uploads available', icon: '🎬', color: '#ff0000',
                    url: `https://www.youtube.com/results?search_query=Ben+10+${encodeURIComponent(playing.title)}+full+episode` },
                  { label: 'Buy / Rent on Amazon', sub: 'HD quality · Paid',      icon: '🛒', color: '#ff9900',
                    url: `https://www.amazon.com/s?k=Ben+10+${encodeURIComponent(playing.seriesTitle)}` },
                ].map(opt => (
                  <a key={opt.label} href={opt.url} target="_blank" rel="noopener noreferrer"
                    className="ep-platform-link">
                    <span className="ep-pl-icon">{opt.icon}</span>
                    <div className="ep-pl-text">
                      <p className="ep-pl-name">{opt.label}</p>
                      <p className="ep-pl-sub" style={{ color: opt.color + 'cc' }}>{opt.sub}</p>
                    </div>
                    <svg className="ep-pl-arrow" width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EpisodesPage
