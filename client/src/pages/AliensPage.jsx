import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useAliens from '../hooks/useAliens'
import AlienCard from '../components/AlienCard'
import AlienModal from '../components/AlienModal'
import { getFavourites } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import './AliensPage.css'

const TYPES = ['All', 'Ultimate', 'Strength', 'Cosmic', 'Ice / Ghost', 'Combat', 'Plant / Fire', 'Sonic', 'Crystal', 'Speed', 'Fire', 'Feral', 'Ghost']

const AliensPage = () => {
  const { aliens: regularAliens, loading: l1 } = useAliens('?isUltimate=false')
  const { aliens: ultimateAliens, loading: l2 } = useAliens('?isUltimate=true')
  const [filter, setFilter]     = useState('All')
  const [selected, setSelected] = useState(null)
  const [search, setSearch]     = useState('')
  const [favIds, setFavIds]     = useState(new Set())
  const { user }                = useAuth()

  const loading   = l1 || l2
  const allAliens = [...regularAliens, ...ultimateAliens]

  // Load existing favourites so each card knows its initial fav state
  useEffect(() => {
    if (!user) return
    loadFavIds()
  }, [user])

  const loadFavIds = () => {
    getFavourites()
      .then(({ data }) => {
        const ids = new Set(data.map(f => f.alien?._id).filter(Boolean))
        setFavIds(ids)
      })
      .catch(() => {})
  }

  const filtered = allAliens.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase())
    if (filter === 'All')      return matchSearch
    if (filter === 'Ultimate') return a.isUltimate && matchSearch
    return a.type === filter && matchSearch
  })

  return (
    <div className="page-wrapper aliens-page">
      <div className="aliens-hero">
        <div className="section-head">
          <p className="sec-label">— Alien Database —</p>
          <h1 className="sec-title">All Transformations</h1>
          <p className="sec-sub">Explore every alien in Ben's Omnitrix arsenal</p>
        </div>

        <div className="search-wrap">
          <input type="text" className="search-input" placeholder="Search aliens..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div className="filter-tabs">
          {TYPES.map(t => (
            <button key={t}
              className={`filter-tab ${filter === t ? 'active' : ''} ${t === 'Ultimate' ? 'filter-tab--ultimate' : ''}`}
              onClick={() => setFilter(t)}>
              {t === 'Ultimate' && '⬡ '}{t}
            </button>
          ))}
        </div>
      </div>

      {loading && <div className="page-loading"><div className="spinner" /></div>}

      {!loading && (
        <motion.div className="aliens-grid" layout>
          {filtered.length === 0 ? (
            <p className="no-results">No aliens found matching your search.</p>
          ) : (
            filtered.map(alien => (
              <div key={alien._id} className="alien-card-wrap">
                {alien.isUltimate && (
                  <div className="alien-ult-badge" style={{ background: alien.accent }}>
                    ⬡ ULTIMATE
                  </div>
                )}
                <AlienCard
                  alien={alien}
                  onClick={setSelected}
                  isFav={favIds.has(alien._id)}
                  onFavChange={loadFavIds}
                />
              </div>
            ))
          )}
        </motion.div>
      )}

      <AlienModal alien={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

export default AliensPage
