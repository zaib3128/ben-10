import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getFavourites } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import AlienCard from '../components/AlienCard'
import AlienModal from '../components/AlienModal'
import './FavouritesPage.css'

const FavouritesPage = () => {
  const [favs, setFavs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    loadFavs()
  }, [user])

  const loadFavs = async () => {
    setLoading(true)
    try {
      const { data } = await getFavourites()
      setFavs(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrapper favs-page">
      <div className="favs-hero">
        <p className="sec-label">— Your Collection —</p>
        <h1 className="sec-title">My Favourites</h1>
        <p className="sec-sub">Your personal alien roster, {user?.username}</p>
      </div>

      {loading ? (
        <div className="page-loading"><div className="spinner" /></div>
      ) : favs.length === 0 ? (
        <motion.div className="empty-favs"
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
          <span className="empty-icon">💚</span>
          <h3>No favourites yet</h3>
          <p>Browse the alien gallery and save your favorites!</p>
          <button className="go-btn" onClick={() => navigate('/aliens')}>
            Explore Aliens
          </button>
        </motion.div>
      ) : (
        <div className="favs-grid">
          {favs.map(({ alien }) => alien && (
            <AlienCard key={alien._id} alien={alien} isFav={true}
              onClick={setSelected} onFavChange={loadFavs} />
          ))}
        </div>
      )}

      <AlienModal alien={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

export default FavouritesPage
