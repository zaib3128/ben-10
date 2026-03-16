import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { registerUser } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import './AuthPage.css'
import React from 'react'


const RegisterPage = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await registerUser(form)
      login(data)
      toast.success(`Account created! Welcome, ${data.username}! 💚`)
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrapper auth-page">
      <div className="auth-bg">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="grid-overlay" />
      </div>

      <motion.div className="auth-card"
        initial={{ opacity:0, scale:0.9 }}
        animate={{ opacity:1, scale:1 }}
        transition={{ duration:0.4 }}>
        <div className="auth-logo">
          <img src="/images/logo.png" alt="Ben 10" onError={e => (e.target.style.display='none')} />
        </div>
        <h2 className="auth-title">Join the Universe</h2>
        <p className="auth-sub">Create your account to save favourite aliens</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" placeholder="BenTennyson" required minLength={3}
              value={form.username} onChange={e => setForm({...form, username: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="omnitrix@ben10.com" required
              value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Min. 6 characters" required minLength={6}
              value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </motion.div>
    </div>
  )
}

export default RegisterPage
