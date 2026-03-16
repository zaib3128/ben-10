import { Routes, Route } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AliensPage from './pages/AliensPage'
import EpisodesPage from './pages/EpisodesPage'
import GamesPage from './pages/GamesPage'
import UltimatePage from './pages/UltimatePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import FavouritesPage from './pages/FavouritesPage'
import Footer from './components/Footer'

function App() {
  const cursorRef = useRef(null)
  const ringRef   = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring   = ringRef.current
    const move = (e) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top  = e.clientY + 'px'
      setTimeout(() => { ring.style.left = e.clientX + 'px'; ring.style.top = e.clientY + 'px' }, 60)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Custom cursor */}
      <div ref={cursorRef} className="fixed w-2.5 h-2.5 bg-[#00ff88] rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2" style={{ mixBlendMode:'difference' }} />
      <div ref={ringRef}   className="fixed w-9 h-9 border border-[#00ff88]/50 rounded-full pointer-events-none z-[99998] -translate-x-1/2 -translate-y-1/2" />

      <Navbar />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/aliens"     element={<AliensPage />} />
        <Route path="/ultimate"   element={<UltimatePage />} />
        <Route path="/episodes"   element={<EpisodesPage />} />
        <Route path="/games"      element={<GamesPage />} />
        <Route path="/login"      element={<LoginPage />} />
        <Route path="/register"   element={<RegisterPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
