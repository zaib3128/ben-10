import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { loginUser } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import './AuthPage.css'
import React from 'react'


const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await loginUser(form)
      login(data)
      toast.success(`Welcome back, ${data.username}! 💚`)
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
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
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-sub">Log in to access your alien favourites</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="omnitrix@ben10.com" required
              value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required
              value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </motion.div>
    </div>
  )
}

export default LoginPage
