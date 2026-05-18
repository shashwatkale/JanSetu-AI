import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight, Home, FileText, MapPin, LayoutDashboard, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import UserMenu from './UserMenu'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Track Complaint', href: '/tracking' },
  { label: 'Admin', href: '/admin' },
]

const MOBILE_NAV = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Report', href: '/new', icon: FileText },
  { label: 'Track', href: '/tracking', icon: MapPin },
  { label: 'Admin', href: '/admin', icon: LayoutDashboard },
  { label: 'Profile', href: '/login', icon: User },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleReport = () => {
    if (!user) navigate('/login', { state: { from: '/new' } })
    else navigate('/new')
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 text-sm font-semibold text-slate-900 dark:text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-200/20 text-xs font-bold">
              JS
            </div>
            <div>
              <p className="text-base font-semibold">JanSetu AI</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Smart Complaint System</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {user ? (
              <>
                <button
                  onClick={handleReport}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-700"
                >
                  Report Issue <ArrowRight className="h-4 w-4" />
                </button>
                <UserMenu />
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                >
                  Login
                </button>
                <button
                  onClick={handleReport}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-700"
                >
                  Report Issue <ArrowRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>

          <button
            className="inline-flex items-center rounded-full border border-slate-200 bg-white p-3 text-slate-700 shadow-sm lg:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950">
            <div className="space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              {user ? (
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-900">
                  {user.photoURL ? (
                    <img src={user.photoURL} className="h-8 w-8 rounded-full" alt={user.name} />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                      {user.name?.[0]?.toUpperCase()}
                    </span>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => { navigate('/login'); setOpen(false) }}
                  className="flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                >
                  Login / Register
                </button>
              )}
              <button
                onClick={() => { handleReport(); setOpen(false) }}
                className="flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Report Issue
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-xl lg:hidden dark:border-slate-800 dark:bg-slate-950/95">
        <div className="flex items-center justify-around px-2 py-2">
          {MOBILE_NAV.map(({ label, href, icon: Icon }) => {
            const active = location.pathname === href
            const isReport = href === '/new'
            if (isReport) return (
              <button
                key={label}
                onClick={handleReport}
                className="flex flex-col items-center gap-1 rounded-2xl bg-emerald-600 px-4 py-2 text-white shadow-lg shadow-emerald-500/30"
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-semibold">Report</span>
              </button>
            )
            return (
              <Link
                key={label}
                to={href}
                className={`flex flex-col items-center gap-1 rounded-2xl px-3 py-2 transition ${active ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
