import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { GardenProvider } from './context/GardenContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <GardenProvider>
        <App />
      </GardenProvider>
    </AuthProvider>
  </StrictMode>,
)
