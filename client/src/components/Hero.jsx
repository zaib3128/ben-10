import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAliens from '../hooks/useAliens'
import './Hero.css'

const Hero = () => {
  const { aliens } = useAliens('?featured=true')
  const navigate = useNavigate()
  const trackRef = useRef(null)

  // Fallback images
  const fallbackImages = [
    '/images/alien1.png',
    '/images/alien2.png',
    '/images/alien3.png',
    '/images/alien4.png',
    '/images/alien5.png',
    '/images/alien6.png'
  ]

  // Use API images if available, otherwise fallback
  const imgs = aliens?.length
    ? aliens.map(a => a.img || a.image)
    : fallbackImages

  // Repeat images for infinite scroll
  const repeated = [...imgs, ...imgs, ...imgs, ...imgs]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let x = 0
    let paused = false
    let animId
    const cardWidth = 174

    const animate = () => {
      if (!paused) {
        x -= 0.5
        if (x < -imgs.length * cardWidth) x = 0
        track.style.transform = `translateX(${x}px)`
      }
      animId = requestAnimationFrame(animate)
    }

    const handleEnter = () => { paused = true }
    const handleLeave = () => { paused = false }

    track.addEventListener('mouseenter', handleEnter)
    track.addEventListener('mouseleave', handleLeave)

    animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      track.removeEventListener('mouseenter', handleEnter)
      track.removeEventListener('mouseleave', handleLeave)
    }
  }, [imgs.length])

  return (
    <div className="hero">

      {/* Background Effects */}
      <div className="hero-bg">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="grid-overlay" />
      </div>

      {/* Hero Content */}
      <div className="hero-content">

        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="badge-dot" /> The Omnitrix Awaits
        </motion.div>

        <motion.div
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="title-main">BEN 10</span>
          <span className="title-logo">
            <img src="/images/omnitrixlogo.png" alt="Omnitrix Logo" />
          </span>
          <span className="title-sub">UNIVERSE</span>
        </motion.div>

        <motion.p
          className="hero-desc"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          10-year-old Ben Tennyson discovers the Omnitrix — an alien device that grants him
          the power to transform into incredible alien heroes and defend the universe.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button className="cta-primary" onClick={() => navigate('/aliens')}>
            Explore Aliens
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="cta-secondary" onClick={() => navigate('/episodes')}>
            Watch Episodes
          </button>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[
            ['10+', 'Alien Forms'],
            ['4', 'Series'],
            ['200+', 'Episodes']
          ].map(([n, l]) => (
            <div className="stat" key={l}>
              <span className="stat-num">{n}</span>
              <span className="stat-label">{l}</span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Alien Carousel */}
      <div className="alien-parade">
        <div className="parade-track" ref={trackRef}>
          {repeated.map((src, i) => (
            <motion.div
              className="parade-card"
              key={`${src}-${i}`}
              whileHover={{ scale: 1.15, y: -12 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <img src={src} alt={`alien-${i}`} loading="lazy" />
            </motion.div>
          ))}
        </div>
        <div className="fade-left" />
        <div className="fade-right" />
      </div>

      {/* Scroll Hint */}
      <motion.div
        className="scroll-hint"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="scroll-mouse"><div className="scroll-wheel" /></div>
        <span>Scroll</span>
      </motion.div>

    </div>
  )
}

export default Hero