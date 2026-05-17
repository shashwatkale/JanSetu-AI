import React, { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function App(){
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const saved = window.localStorage.getItem('jansetu-theme')
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
    const initial = saved || (prefersDark ? 'dark' : 'light')
    setTheme(initial)
    document.documentElement.classList.toggle('dark', initial === 'dark')
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    window.localStorage.setItem('jansetu-theme', nextTheme)
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
  }

  return (
    <div className="app-container min-h-screen">
      <header className="mb-8 rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-200/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm dark:bg-slate-800 dark:text-slate-100">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              JanSetu AI
            </div>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">Smart public complaint detection for civic authorities.</h1>
            <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">Upload an incident image, get AI-generated analysis, category detection, severity prediction, and department routing — all in one simple workflow.</p>
          </div>

          <nav className="flex flex-wrap gap-3">
            <Link className="btn-sm bg-indigo-600 text-white hover:bg-indigo-700" to="/new">File New Complaint</Link>
            <Link className="btn-sm btn-secondary" to="/tracking">Track Complaint</Link>
            <Link className="btn-sm btn-secondary" to="/admin">Admin Dashboard</Link>
            <button type="button" className="btn-sm btn-secondary" onClick={toggleTheme}>
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
