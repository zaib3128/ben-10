import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useAliens from '../hooks/useAliens'
import AlienCard from '../components/AlienCard'
import AlienModal from '../components/AlienModal'
import './UltimatePage.css'

const UltimatePage = () => {
  const { aliens, loading, error } = useAliens('?isUltimate=true')
  const [selected, setSelected] = useState(null)
  const [search, setSearch]     = useState('')

  const filtered = aliens.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="ult-page">

      {/* ── Hero Banner ── */}
      <div className="ult-hero">
        <div className="ult-hero-orb ult-hero-orb--1" />
        <div className="ult-hero-orb ult-hero-orb--2" />
        <div className="ult-hero-grid" />

        <div className="ult-hero-content">
          <motion.div className="ult-hero-badge"
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}>
            <span className="ult-badge-dot" />
            Ultimatrix Activated
          </motion.div>

          <motion.h1 className="ult-hero-title"
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.25 }}>
            <span className="ult-title-line1">ULTIMATE</span>
            <span className="ult-title-line2">MODE</span>
          </motion.h1>

          <motion.p className="ult-hero-desc"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}>
            The Ultimatrix simulates millions of years of evolution in seconds —
            pushing each alien to their absolute peak potential.
          </motion.p>

          <motion.div className="ult-hero-stats"
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.55 }}>
            {[['6','Ultimate Forms'],['∞','Evolved Power'],['1','Ultimatrix']].map(([n,l]) => (
              <div key={l} className="ult-stat">
                <span className="ult-stat-num">{n}</span>
                <span className="ult-stat-label">{l}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Ultimatrix Banner ── */}
      <div className="ult-banner">
        <div className="ult-banner-line" />
        <span className="ult-banner-text">⬡ EVOLUTION PROTOCOL ENGAGED ⬡</span>
        <div className="ult-banner-line" />
      </div>

      {/* ── Search ── */}
      <div className="ult-search-wrap">
        <input type="text" className="ult-search" placeholder="Search ultimate forms..."
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* ── Grid ── */}
      {loading ? (
        <div className="ult-loading"><div className="ult-spinner" /></div>
      ) : error ? (
        <p className="ult-error">⚠️ {error}</p>
      ) : (
        <motion.div layout className="ult-grid">
          {filtered.length === 0 ? (
            <p className="ult-empty">No ultimate forms found.</p>
          ) : (
            filtered.map((alien, i) => (
              <motion.div key={alien._id} className="ult-card-wrap"
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay: i * 0.08 }}>

                {/* Ultimate badge overlay */}
                <div className="ult-card-badge" style={{ background: alien.accent }}>
                  ⬡ ULTIMATE
                </div>

                {/* Base alien label */}
                <div className="ult-evolved-from">
                  Evolved from: <span style={{ color: alien.accent }}>{alien.baseAlien}</span>
                </div>

                <AlienCard alien={alien} onClick={setSelected} />
              </motion.div>
            ))
          )}
        </motion.div>
      )}

      {/* ── Info strip ── */}
      <div className="ult-info-strip">
        <div className="ult-info-card">
          <span className="ult-info-icon">⚗️</span>
          <div>
            <p className="ult-info-title">Simulated Evolution</p>
            <p className="ult-info-sub">The Ultimatrix runs millions of years of evolution in seconds</p>
          </div>
        </div>
        <div className="ult-info-card">
          <span className="ult-info-icon">🧬</span>
          <div>
            <p className="ult-info-title">Peak Performance</p>
            <p className="ult-info-sub">Each ultimate form represents the apex of their species' potential</p>
          </div>
        </div>
        <div className="ult-info-card">
          <span className="ult-info-icon">⬡</span>
          <div>
            <p className="ult-info-title">Ultimatrix</p>
            <p className="ult-info-sub">Azmuth's upgraded successor to the original Omnitrix</p>
          </div>
        </div>
      </div>

      <AlienModal alien={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

export default UltimatePage
