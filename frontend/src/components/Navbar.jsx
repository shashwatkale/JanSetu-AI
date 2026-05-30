import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight, Zap } from 'lucide-react'

const links = [
  { label: 'How it Works', href: '/how-it-works' },
  { label: 'Features',     href: '/features'     },
  { label: 'Track',        href: '/tracking'     },
  { label: 'Admin',        href: '/admin'        },
]

export default function Navbar() {
  const [open, setOpen]   = useState(false)
  const { pathname }      = useLocation()

  const isActive = (href) => pathname === href

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-200">
            <Zap className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold text-slate-900">JanSetu AI</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.href}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                isActive(l.href)
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to="/new"
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-200 transition hover:bg-emerald-700"
          >
            Report Issue <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-lg border border-slate-200 p-2 text-slate-600 lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-2">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.href}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive(l.href) ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50'
              }`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/new"
            className="mt-2 flex w-full items-center justify-center rounded-full bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            onClick={() => setOpen(false)}
          >
            Report Issue
          </Link>
        </div>
      )}
    </header>
  )
}
