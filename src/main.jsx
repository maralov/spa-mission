import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const normalizeBasename = (baseUrl) => {
  if (!baseUrl) return '/'
  if (baseUrl === '/') return '/'
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
}

const basename = normalizeBasename(import.meta.env.BASE_URL)

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
)
