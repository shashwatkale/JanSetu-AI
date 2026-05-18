import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl px-4 py-8 pb-24 sm:px-6 lg:px-8 lg:pb-8">
          <Outlet />
        </main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: { borderRadius: '16px', fontSize: '14px' },
            success: { iconTheme: { primary: '#059669', secondary: '#fff' } },
          }}
        />
      </div>
    </AuthProvider>
  )
}
