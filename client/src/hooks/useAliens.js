import { useState, useEffect } from 'react'
import axios from 'axios'

const useAliens = (query = '') => {
  const [aliens, setAliens]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`/api/aliens${query}`)
        setAliens(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load aliens')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [query])

  return { aliens, loading, error }
}

export default useAliens
