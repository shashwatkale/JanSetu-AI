import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Sparkles, Zap, MapPin } from 'lucide-react'

const resultCard = [
  { label: 'Issue Type', value: 'Pothole / Road Damage', color: 'text-slate-900' },
  { label: 'Severity', value: 'Medium', color: 'text-amber-600' },
  { label: 'Department', value: 'Municipal Corporation', color: 'text-sky-700' },
  { label: 'Action', value: 'Repair within 48 hrs', color: 'text-emerald-700' },
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-8 py-16 shadow-2xl lg:px-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.15),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.1),transparent_55%)]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        {/* Left */}
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" /> AI-Powered Civic Platform
          </div>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Report civic issues.<br />
            <span className="text-emerald-400">AI handles the rest.</span>
          </h1>

          <p className="max-w-md text-base leading-relaxed text-slate-400">
            Upload a photo. JanSetu AI detects the issue, assigns severity, and routes it to the right government department — instantly.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/new"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400"
            >
              Report an Issue <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/tracking"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
            >
              Track Complaint
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            {[
              { icon: Zap, text: 'AI Detection' },
              { icon: MapPin, text: 'Auto Routing' },
              { icon: ShieldCheck, text: 'Real-time Tracking' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-sm text-slate-400">
                <Icon className="h-4 w-4 text-emerald-500" /> {text}
              </div>
            ))}
          </div>
        </div>

        {/* Right — AI Result Card */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm rounded-2xl border border-slate-700/60 bg-slate-900/80 p-5 shadow-2xl backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">AI Analysis</span>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
              </span>
            </div>

            <div className="mb-4 overflow-hidden rounded-xl border border-slate-700">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=60"
                alt="Civic issue"
                className="h-36 w-full object-cover opacity-80"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {resultCard.map(({ label, value, color }) => (
                <div key={label} className="rounded-xl bg-slate-800/70 p-3">
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className={`mt-1 text-sm font-semibold ${color}`}>{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2.5">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-300">Complaint auto-generated & routed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
