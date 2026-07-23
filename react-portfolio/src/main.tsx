import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

const container = document.getElementById('root')!
createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Add delegated click ripple for .glass-card
document.addEventListener('click', (e) => {
  const target = (e.target as HTMLElement).closest('.glass-card') as HTMLElement | null
  if (!target) return
  const rect = target.getBoundingClientRect()
  const x = (e as MouseEvent).clientX - rect.left
  const y = (e as MouseEvent).clientY - rect.top
  const ripple = document.createElement('span')
  ripple.className = 'ripple'
  const size = Math.max(rect.width, rect.height) * 0.4
  ripple.style.width = ripple.style.height = `${size}px`
  ripple.style.left = `${x - size / 2}px`
  ripple.style.top = `${y - size / 2}px`
  target.appendChild(ripple)
  setTimeout(() => ripple.remove(), 650)
})
