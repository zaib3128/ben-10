import { motion, AnimatePresence } from 'framer-motion'
import './AlienModal.css'

const AlienModal = ({ alien, onClose }) => {
  if (!alien) return null

  return (
    <AnimatePresence>
      <motion.div className="modal-overlay" onClick={onClose}
        initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
        <motion.div
          className="modal-card"
          style={{ '--accent': alien.accent || '#00ff88' }}
          onClick={e => e.stopPropagation()}
          initial={{ scale:0.8, opacity:0 }}
          animate={{ scale:1, opacity:1 }}
          exit={{ scale:0.8, opacity:0 }}
          transition={{ type:'spring', stiffness:300, damping:25 }}
        >
          <button className="modal-close" onClick={onClose}>✕</button>

          <div className="modal-img">
            <img src={alien.img} alt={alien.name} />
          </div>

          <div className="modal-info">
            <span className="modal-type">{alien.type}</span>
            <h2 className="modal-name">{alien.name}</h2>
            <p className="modal-planet">🌍 Home World: {alien.planet}</p>
            <p className="modal-desc">{alien.description}</p>

            <div className="modal-power">
              <div className="modal-power-label">
                <span>Power Level</span>
                <span style={{ color: alien.accent }}>{alien.power}%</span>
              </div>
              <div className="modal-power-track">
                <motion.div
                  className="modal-power-fill"
                  style={{ background: alien.accent }}
                  initial={{ width:0 }}
                  animate={{ width: `${alien.power}%` }}
                  transition={{ duration:0.8, delay:0.2 }}
                />
              </div>
            </div>

            <div className="modal-abilities">
              <span className="modal-ab-label">Abilities</span>
              <div className="modal-ab-list">
                {alien.abilities?.map(ab => (
                  <span key={ab} className="modal-tag"
                    style={{ color: alien.accent, borderColor: (alien.accent || '#00ff88') + '44' }}>
                    {ab}
                  </span>
                ))}
              </div>
            </div>

            {alien.series?.length > 0 && (
              <div className="modal-series">
                <span className="modal-ab-label">Appears In</span>
                <div className="modal-ab-list">
                  {alien.series.map(s => (
                    <span key={s} className="modal-tag series-tag">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AlienModal
