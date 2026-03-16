import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import './GamesPage.css'

const GamesPage = () => {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/games').then(({ data }) => {
      setGames(data)
      setLoading(false)
    })
  }, [])

  const stars = (rating, color) =>
    [1,2,3,4,5].map(s => (
      <span key={s} style={{ color: s <= Math.round(rating) ? color : 'rgba(255,255,255,0.12)', fontSize:16 }}>★</span>
    ))

  return (
    <div className="page-wrapper games-page">
      <div className="games-hero">
        <p className="sec-label">— Play the Universe —</p>
        <h1 className="sec-title">Games</h1>
        <p className="sec-sub">Step into the Omnitrix across multiple gaming platforms</p>
      </div>

      {loading ? (
        <div className="page-loading"><div className="spinner" /></div>
      ) : (
        <div className="games-grid">
          {games.map((game, i) => (
            <motion.div key={game._id} className="game-card"
              style={{ '--gc': game.color }}
              initial={{ opacity:0, y:30 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay: i*0.1 }}
              whileHover={{ y:-6 }}>
              <div className="game-thumb">
                <img src={game.thumb} alt={game.title} loading="lazy" />
                <span className="game-tag" style={{ background:game.color, color:'#000' }}>{game.tag}</span>
              </div>
              <div className="game-body">
                <div className="game-meta">
                  <span className="game-platform">{game.platform}</span>
                  <span className="game-year" style={{ color:game.color }}>{game.year}</span>
                </div>
                <h3 className="game-title">{game.title}</h3>
                <p className="game-desc">{game.description}</p>
                <div className="game-footer">
                  <div className="game-stars">
                    {stars(game.rating, game.color)}
                    <span className="rating-num">{game.rating}</span>
                  </div>
                  <button className="g-btn" style={{ borderColor:game.color, color:game.color }}>
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default GamesPage
