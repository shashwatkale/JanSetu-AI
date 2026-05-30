import { Link } from 'react-router-dom'
import { Zap, Github, Twitter } from 'lucide-react'

const nav = [
  { label: 'Home',         href: '/'            },
  { label: 'How it Works', href: '/how-it-works' },
  { label: 'Features',     href: '/features'     },
  { label: 'Report',       href: '/new'          },
  { label: 'Track',        href: '/tracking'     },
  { label: 'Admin',        href: '/admin'        },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">JanSetu AI</p>
              <p className="text-xs text-slate-400">AI-Powered Civic Platform</p>
            </div>
          </div>

          {/* Nav */}
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {nav.map((l) => (
              <Link key={l.label} to={l.href} className="text-sm text-slate-500 transition hover:text-slate-900">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-3 text-slate-400">
            <a href="#" className="transition hover:text-slate-700"><Github className="h-4.5 w-4.5 h-[18px] w-[18px]" /></a>
            <a href="#" className="transition hover:text-slate-700"><Twitter className="h-4.5 w-4.5 h-[18px] w-[18px]" /></a>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-400">© 2024 JanSetu AI. All rights reserved.</p>
          <p className="text-xs text-slate-400">Built for citizens. Powered by AI.</p>
        </div>
      </div>
    </footer>
  )
}
