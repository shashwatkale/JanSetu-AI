import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, MapPin, Bell, ArrowRight } from 'lucide-react'
import { navLinks } from '../data/landingData'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-sm font-semibold text-slate-900 dark:text-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-200/20">
            JA
          </div>
          <div>
            <p className="text-base font-semibold">JanSetu AI</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Smart Public Complaint System</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.href} className="text-sm font-medium text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            <MapPin className="h-4 w-4 text-emerald-600" />
            Indore, Madhya Pradesh
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
            <Bell className="h-4 w-4" />
            Login / Register
          </button>
          <Link to="/new" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-700">
            Report Issue
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button className="inline-flex items-center rounded-full border border-slate-200 bg-white p-3 text-slate-700 shadow-sm lg:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.href} className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 space-y-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <MapPin className="h-4 w-4 text-emerald-600" />
              Indore, MP
            </button>
            <button className="flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
              <Bell className="h-4 w-4" />
              Login / Register
            </button>
            <Link to="/new" className="flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
              Report Issue
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
