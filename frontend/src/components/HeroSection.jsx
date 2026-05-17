import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Activity, Clock3 } from 'lucide-react'
import { heroHighlights } from '../data/landingData'

const floatingCards = [
  { title: 'Issue Detected', value: 'Pothole / Road Damage', accent: 'bg-white/95 text-slate-950' },
  { title: 'Severity', value: 'Medium', accent: 'bg-emerald-50 text-emerald-700' },
  { title: 'Routed To', value: 'Municipal Corporation', accent: 'bg-sky-50 text-slate-950' },
  { title: 'Estimated Action', value: '48 hrs', accent: 'bg-indigo-50 text-slate-950' },
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[40px] border border-slate-200 bg-gradient-to-br from-emerald-50 via-slate-100 to-sky-50 p-6 shadow-2xl shadow-slate-200/40 dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.14),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.14),_transparent_18%)]" />
      <div className="relative mx-auto grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full bg-emerald-600/10 px-4 py-2 text-sm font-semibold text-emerald-700 backdrop-blur-sm dark:bg-emerald-500/10 dark:text-emerald-300">
            <Sparkles className="h-4 w-4" />
            AI-Powered Civic Management
          </div>

          <div className="space-y-6">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl dark:text-white">Report Civic Issues in Seconds. AI Routes Them to the Right Department.</h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">Upload a photo of potholes, garbage, water leaks, electric hazards, or public damage. JanSetu AI detects the issue, predicts severity, generates a complaint, and routes it automatically.</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/new" className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800">
              Report an Issue
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/tracking" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
              Track Complaint
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {heroHighlights.map((item) => (
              <div key={item.title} className="rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  {item.icon === 'Ai' ? <ShieldCheck className="h-5 w-5" /> : item.icon === 'Routing' ? <ArrowRight className="h-5 w-5" /> : item.icon === 'Track' ? <Activity className="h-5 w-5" /> : <Clock3 className="h-5 w-5" />}
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-md rounded-[40px] bg-slate-950/95 p-5 shadow-[0_40px_120px_-45px_rgba(15,23,42,0.45)]">
            <div className="absolute -left-8 top-10 hidden h-24 w-24 rounded-full bg-emerald-500/10 blur-3xl md:block" />
            <div className="absolute -right-8 top-24 hidden h-24 w-24 rounded-full bg-sky-500/10 blur-3xl md:block" />

            <div className="rounded-[36px] border border-slate-800 bg-slate-950 p-5 shadow-xl shadow-slate-950/50">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>JanSetu Mobile</span>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">Live demo</span>
              </div>
              <div className="mt-5 rounded-[32px] border border-slate-800 bg-slate-900 p-5">
                <div className="mb-4 rounded-[28px] bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Pothole report</span>
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">In Progress</span>
                  </div>
                  <div className="overflow-hidden rounded-[24px] border border-slate-700 bg-slate-950">
                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=60" alt="Issue preview" className="h-48 w-full object-cover" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[28px] bg-slate-950/90 p-4 text-slate-200">
                    <p className="text-sm text-slate-400">Detected issue</p>
                    <p className="text-lg font-semibold text-white">Pothole / Road Damage</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[28px] bg-slate-950/90 p-4 text-slate-200">
                      <p className="text-sm text-slate-400">Severity</p>
                      <p className="text-lg font-semibold text-amber-300">Medium</p>
                    </div>
                    <div className="rounded-[28px] bg-slate-950/90 p-4 text-slate-200">
                      <p className="text-sm text-slate-400">Department</p>
                      <p className="text-lg font-semibold text-sky-300">Municipal Corporation</p>
                    </div>
                  </div>
                  <div className="rounded-[28px] bg-slate-950/90 p-4 text-slate-200">
                    <p className="text-sm text-slate-400">Complaint ID</p>
                    <p className="text-lg font-semibold text-white">JS-20240517-081</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {floatingCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * index, duration: 0.4 }}
              className={`absolute ${index === 0 ? 'left-0 top-16' : index === 1 ? 'right-0 top-10' : index === 2 ? 'left-4 bottom-10' : 'right-4 bottom-14'} w-56 rounded-[28px] p-4 shadow-xl shadow-slate-900/10 ${card.accent}`}
            >
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{card.title}</p>
              <p className="mt-2 font-semibold text-slate-900 dark:text-white">{card.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
