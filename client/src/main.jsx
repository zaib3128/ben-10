import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0a1a0e',
              color: '#fff',
              border: '1px solid rgba(0,255,136,0.2)',
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '15px',
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
