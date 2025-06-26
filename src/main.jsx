import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import initIOSCompatibility from './utils/iosCompatibility.js'

// Initialize iOS compatibility fixes
initIOSCompatibility();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
