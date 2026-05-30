import { Link } from 'react-router-dom'
import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <Zap className="h-3.5 w-3.5" />
          </div>
          JanSetu AI
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <Link to="/" className="hover:text-slate-900">Home</Link>
          <Link to="/new" className="hover:text-slate-900">Report</Link>
          <Link to="/tracking" className="hover:text-slate-900">Track</Link>
          <Link to="/admin" className="hover:text-slate-900">Admin</Link>
        </div>

        <p className="text-xs text-slate-400">© 2024 JanSetu AI</p>
      </div>
    </footer>
  )
}
