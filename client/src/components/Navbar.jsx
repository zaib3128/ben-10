import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaHeart, FaBars, FaTimes } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const { user, logout }          = useAuth()
  const location                  = useLocation()
  const navigate                  = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => { logout(); navigate('/'); setMenuOpen(false) }
  const isActive = (to) => location.pathname === to

  const navLinks = [
    { label: 'Home',     to: '/' },
    { label: 'Aliens',   to: '/aliens' },
    { label: 'Ultimate', to: '/ultimate', special: true },
    { label: 'Episodes', to: '/episodes' },
    { label: 'Games',    to: '/games' },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src="/images/logo.png" alt="Ben 10" className="navbar-logo-img"
            onError={e => (e.target.style.display = 'none')} />
          <span className="navbar-logo-text">BEN 10</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="navbar-links">
          {navLinks.map(n => (
            <li key={n.to}>
              <Link to={n.to}
                className={`nav-link ${n.special ? 'nav-link--ultimate' : ''} ${isActive(n.to) ? 'active' : ''}`}>
                {n.special ? `⬡ ${n.label}` : n.label}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <Link to="/favourites"
                className={`nav-link ${isActive('/favourites') ? 'active' : ''}`}>
                <FaHeart className="nav-heart" />Favourites
              </Link>
            </li>
          )}
        </ul>

        {/* Auth Buttons */}
        <div className="navbar-auth">
          {user ? (
            <>
              <span className="navbar-username">👾 {user.username}</span>
              <button onClick={handleLogout} className="btn-nav btn-nav--outline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-nav btn-nav--outline">Login</Link>
              <Link to="/register" className="btn-nav btn-nav--filled">Sign Up</Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile ${menuOpen ? 'open' : ''}`}>
        {[...navLinks, ...(user ? [{ label: 'Favourites', to: '/favourites' }] : [])].map(n => (
          <Link key={n.to} to={n.to}
            className={`nav-mobile-link ${n.special ? 'nav-mobile-link--ultimate' : ''}`}
            onClick={() => setMenuOpen(false)}>
            {n.special ? `⬡ ${n.label}` : n.label}
          </Link>
        ))}
        {user ? (
          <button onClick={handleLogout} className="nav-mobile-link">Logout</button>
        ) : (
          <div className="navbar-mobile-auth">
            <Link to="/login" onClick={() => setMenuOpen(false)}
              className="btn-nav btn-nav--outline">Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}
              className="btn-nav btn-nav--filled">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
