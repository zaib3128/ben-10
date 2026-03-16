import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { addFavourite, removeFavourite } from '../utils/api'
import toast from 'react-hot-toast'
import './AlienCard.css'

const AlienCard = ({ alien, onClick, isFav = false, onFavChange }) => {
  const { user } = useAuth()
  const [fav, setFav] = useState(isFav)
  const [loading, setLoading] = useState(false)

  const toggleFav = async (e) => {
    e.stopPropagation()
    if (!user) return toast.error('Login to save favourites!')
    setLoading(true)
    try {
      if (fav) {
        await removeFavourite(alien._id)
        toast.success('Removed from favourites')
      } else {
        await addFavourite(alien._id)
        toast.success('Added to favourites! 💚')
      }
      setFav(!fav)
      onFavChange?.()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error updating favourites')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="alien-card"
      style={{ '--accent': alien.accent || '#00ff88' }}
      onClick={() => onClick?.(alien)}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <button
        className={`fav-btn ${fav ? 'active' : ''}`}
        onClick={toggleFav}
        disabled={loading}
        title={fav ? 'Remove favourite' : 'Add to favourites'}
      >
        {fav ? <FaHeart /> : <FaRegHeart />}
      </button>

      <div className="card-img-wrap">
        <img src={alien.img} alt={alien.name} loading="lazy" />
      </div>

      <div className="card-body">
        <span className="card-type">{alien.type}</span>
        <h3 className="card-name">{alien.name}</h3>
        <span className="card-planet">📍 {alien.planet}</span>

        <div className="power-mini">
          <span>Power</span>
          <div className="power-bar-mini">
            <div className="power-bar-fill"
              style={{ width: `${alien.power}%`, background: alien.accent || '#00ff88' }} />
          </div>
          <span className="power-num">{alien.power}</span>
        </div>
      </div>

      <div className="card-hover-overlay">
        <span>View Profile</span>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    </motion.div>
  )
}

export default AlienCard
