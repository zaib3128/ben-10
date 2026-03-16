import axios from 'axios'

// In production uses Render backend URL, in development uses Vite proxy
const BASE_URL = import.meta.env.VITE_API_URL || ''

const API = axios.create({ baseURL: `${BASE_URL}/api` })

// Automatically attach JWT token to every request
API.interceptors.request.use((config) => {
  const stored = localStorage.getItem('ben10_user')
  if (stored) {
    try {
      const { token } = JSON.parse(stored)
      if (token) config.headers.Authorization = `Bearer ${token}`
    } catch (e) {}
  }
  return config
})

export const fetchAliens     = (params = '') => API.get(`/aliens${params}`)
export const fetchAlienById  = (id)          => API.get(`/aliens/${id}`)
export const fetchEpisodes   = ()            => API.get('/episodes')
export const fetchGames      = ()            => API.get('/games')
export const registerUser    = (data)        => API.post('/auth/register', data)
export const loginUser       = (data)        => API.post('/auth/login', data)
export const getMe           = ()            => API.get('/auth/me')
export const getFavourites   = ()            => API.get('/favourites')
export const addFavourite    = (alienId)     => API.post('/favourites', { alienId })
export const removeFavourite = (alienId)     => API.delete(`/favourites/${alienId}`)

export default API