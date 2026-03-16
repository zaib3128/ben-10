import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import useAliens from '../hooks/useAliens'
import './AlienSlider.css'

const AlienSlider = () => {
  const { aliens, loading } = useAliens()
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState('next')

  useEffect(() => {
    if (!aliens.length) return
    const t = setInterval(() => {
      setDir('next')
      setIdx(p => (p + 1) % aliens.length)
    }, 5000)
    return () => clearInterval(t)
  }, [aliens.length])

  if (loading) return (
    <div className="slider-loading">
      <div className="spinner" />
    </div>
  )

  if (!aliens.length) return null

  const alien = aliens[idx]

  const prev = () => { setDir('prev'); setIdx(p => (p - 1 + aliens.length) % aliens.length) }
  const next = () => { setDir('next'); setIdx(p => (p + 1) % aliens.length) }

  return (
    <div className="alien-slider-section" style={{ background: alien.background }}>
      <div className="slider-particles">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`sp sp${i}`} style={{ '--c': alien.accent }} />
        ))}
      </div>

      <div className="section-head">
        <p className="sec-label">— Alien Roster —</p>
        <h2 className="sec-title">Meet The Aliens</h2>
      </div>

      <div className="as-body">
        {/* Info Panel */}
        <AnimatePresence mode="wait">
          <motion.div key={idx + 'info'} className="as-info"
            initial={{ x: dir==='next' ? -60 : 60, opacity:0 }}
            animate={{ x:0, opacity:1 }}
            exit={{ x: dir==='next' ? 60 : -60, opacity:0 }}
            transition={{ duration:0.5 }}>
            <div className="as-meta">
              <span className="meta-tag" style={{ color:alien.accent, borderColor:alien.accent+'66' }}>{alien.type}</span>
              <span className="meta-planet">📍 {alien.planet}</span>
            </div>
            <h1 className="as-name" style={{ color:alien.accent }}>{alien.name}</h1>
            <p className="as-desc">{alien.description}</p>

            <div className="as-power">
              <div className="as-power-label">
                <span>Power Level</span>
                <span style={{ color:alien.accent }}>{alien.power}%</span>
              </div>
              <div className="as-power-track">
                <motion.div className="as-power-fill"
                  style={{ background:alien.accent, boxShadow:`0 0 15px ${alien.accent}88` }}
                  initial={{ width:0 }} animate={{ width:`${alien.power}%` }}
                  transition={{ duration:0.8, delay:0.2 }} />
              </div>
            </div>

            <div>
              <p className="as-ab-label">Abilities</p>
              <div className="as-ab-tags">
                {alien.abilities?.map((ab, i) => (
                  <motion.span key={ab} className="as-ab-tag"
                    style={{ color:alien.accent, borderColor:alien.accent+'44' }}
                    initial={{ opacity:0, scale:0.8 }}
                    animate={{ opacity:1, scale:1 }}
                    transition={{ delay: 0.3 + i*0.08 }}>
                    {ab}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Images */}
        <div className="as-images">
          {aliens.map((al, i) => {
            const offset = (i - idx + aliens.length) % aliens.length
            let transform = 'translate(-50%,-50%) translate(0,0) scale(0)'
            let opacity = 0, zIndex = 0, filter = 'blur(4px)'
            if (offset === 0) { transform='translate(-50%,-50%) translate(0,0) scale(1.25) rotate(-3deg)'; opacity=1; zIndex=5; filter='none'; }
            else if (offset === 1) { transform='translate(-50%,-50%) translate(160px,-60px) scale(0.8) rotate(5deg)'; opacity=0.4; zIndex=4; filter='blur(3px)'; }
            else if (offset === aliens.length-1) { transform='translate(-50%,-50%) translate(-130px,120px) scale(0.65) rotate(-8deg)'; opacity=0.28; zIndex=3; filter='blur(4px)'; }
            const src = al.sliderImg || al.img
            return (
              <motion.img key={i} src={src} alt={al.name} className="as-img"
                animate={{ transform, opacity, zIndex }}
                transition={{ duration:0.6 }}
                style={{ filter: offset===0 ? `drop-shadow(0 20px 40px ${alien.accent}66)` : filter }} />
            )
          })}
          <div className="omnitrix-ring" style={{ borderColor:alien.accent+'44', boxShadow:`0 0 40px ${alien.accent}18` }} />
        </div>
      </div>

      {/* Nav */}
      <div className="as-nav">
        <button className="as-arrow" onClick={prev}><FaChevronLeft size={20}/></button>
        <div className="as-dots">
          {aliens.map((_, i) => (
            <button key={i}
              className={`as-dot ${i===idx?'active':''}`}
              style={i===idx ? { background:alien.accent, boxShadow:`0 0 10px ${alien.accent}`, width:24, borderRadius:4 } : {}}
              onClick={() => { setDir(i>idx?'next':'prev'); setIdx(i) }} />
          ))}
        </div>
        <button className="as-arrow" onClick={next}><FaChevronRight size={20}/></button>
      </div>
    </div>
  )
}

export default AlienSlider
