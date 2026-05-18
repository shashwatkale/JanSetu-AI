import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import Landing from './pages/Landing'
import ReportIssuePage from './pages/ReportIssuePage'
import Admin from './pages/Admin'
import Tracking from './pages/Tracking'
import LoginPage from './pages/LoginPage'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Landing />} />
          <Route path="new" element={<ReportIssuePage />} />
          <Route path="admin" element={<Admin />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
