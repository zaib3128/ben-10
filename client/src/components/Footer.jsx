import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => (
  <footer className="footer">
    <div className="footer-glow" />
    <div className="footer-inner">
      <div className="footer-brand">
        <img src="/images/logo.png" alt="Ben 10" className="footer-logo"
          onError={e => (e.target.style.display = 'none')} />
        <p className="footer-tagline">
          With great power comes great responsibility.<br />
          <span>Choose wisely. Transform boldly.</span>
        </p>
      </div>
      <div className="footer-links">
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/aliens">Aliens</Link></li>
            <li><Link to="/episodes">Episodes</Link></li>
            <li><Link to="/games">Games</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Account</h4>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Sign Up</Link></li>
            <li><Link to="/favourites">Favourites</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Community</h4>
          <ul>
            <li><a href="#">Forum</a></li>
            <li><a href="#">Fan Art</a></li>
            <li><a href="#">Wiki</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2024 Ben 10 Universe. Built with the MERN Stack. 💚</p>
      <p>Ben 10 is property of Cartoon Network / Turner Broadcasting.</p>
    </div>
  </footer>
)

export default Footer
