import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Landing from './pages/Landing'
import Upload from './pages/Upload'
import Admin from './pages/Admin'
import Tracking from './pages/Tracking'
import HowItWorks from './pages/HowItWorks'
import Features from './pages/Features'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Landing />} />
          <Route path="new" element={<Upload />} />
          <Route path="admin" element={<Admin />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="features" element={<Features />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
