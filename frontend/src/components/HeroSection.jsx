import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Sparkles, Zap, MapPin, Activity, CheckCircle2, Upload, Cpu, GitBranch, FileText } from 'lucide-react'

const trustBadges = [
  { icon: Sparkles, text: 'AI Powered Analysis' },
  { icon: GitBranch, text: 'Smart Department Routing' },
  { icon: Activity, text: 'Real-Time Tracking' },
  { icon: MapPin, text: 'Location Aware' },
]

const workflowSteps = [
  { icon: Upload,       label: 'Upload Image',         color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  { icon: Cpu,          label: 'AI Analysis',           color: 'bg-sky-500/20     text-sky-400     border-sky-500/30'     },
  { icon: GitBranch,    label: 'Dept. Assignment',      color: 'bg-violet-500/20  text-violet-400  border-violet-500/30'  },
  { icon: FileText,     label: 'Complaint Generated',   color: 'bg-amber-500/20   text-amber-400   border-amber-500/30'   },
  { icon: CheckCircle2, label: 'Tracking Enabled',      color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
]

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-8 py-16 shadow-2xl lg:px-16 lg:py-24">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-sky-500/8 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
        {/* ── Left copy ── */}
        <motion.div
          className="space-y-8"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" /> AI-Powered Civic Platform
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4">
            <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              Transforming Civic<br />
              Issue Reporting{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                with AI
              </span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-slate-400">
              Report potholes, garbage, water leaks, electrical hazards, and public infrastructure issues in seconds. JanSetu AI automatically analyzes, routes, and tracks complaints from submission to resolution.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <Link
              to="/new"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 hover:shadow-emerald-400/40"
            >
              Report Issue <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/tracking"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur-sm transition hover:border-slate-500 hover:bg-slate-800"
            >
              Track Complaint
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {trustBadges.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 backdrop-blur-sm"
              >
                <Icon className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span className="text-xs font-medium text-slate-300">{text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: animated workflow ── */}
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-full max-w-xs">
            {/* Workflow card */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-5 shadow-2xl backdrop-blur-sm">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">AI Workflow</span>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Live
                </span>
              </div>

              <div className="space-y-2">
                {workflowSteps.map(({ icon: Icon, label, color }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.15, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    {/* Step connector */}
                    <div className="flex flex-col items-center">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-xl border ${color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      {i < workflowSteps.length - 1 && (
                        <motion.div
                          className="mt-1 h-4 w-px bg-slate-700"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: 0.55 + i * 0.15, duration: 0.2 }}
                        />
                      )}
                    </div>
                    <div className="flex-1 rounded-xl bg-slate-800/60 px-3 py-2">
                      <p className="text-xs font-semibold text-slate-200">{label}</p>
                    </div>
                    {i < workflowSteps.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 + i * 0.15 }}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                <span className="text-xs font-medium text-emerald-300">Complaint auto-generated & routed</span>
              </motion.div>
            </div>

            {/* Floating stat pill */}
            <motion.div
              className="mt-3 flex items-center justify-center gap-6 rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-3 backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
            >
              {[
                { value: '< 30s', label: 'To report' },
                { value: '95%', label: 'AI accuracy' },
                { value: '10+', label: 'Departments' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-sm font-bold text-white">{value}</p>
                  <p className="text-[10px] text-slate-500">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
