import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Clock, CheckCircle2, AlertTriangle } from 'lucide-react'

const stats = [
  { label: 'Total Complaints', value: '1,240', delta: '+12% this month', icon: TrendingUp,    accent: 'text-slate-900',   iconBg: 'bg-slate-100 text-slate-600'   },
  { label: 'In Progress',      value: '68',    delta: 'Active cases',    icon: Clock,         accent: 'text-sky-600',     iconBg: 'bg-sky-100 text-sky-600'       },
  { label: 'Resolved',         value: '1,088', delta: '87.7% resolution', icon: CheckCircle2, accent: 'text-emerald-600', iconBg: 'bg-emerald-100 text-emerald-600'},
  { label: 'Critical Issues',  value: '32',    delta: 'Needs attention', icon: AlertTriangle, accent: 'text-rose-600',    iconBg: 'bg-rose-100 text-rose-600'     },
]

const lifecycle = [
  { label: 'Reported',    done: true  },
  { label: 'Verified',    done: true  },
  { label: 'Assigned',    done: true  },
  { label: 'In Progress', done: false, active: true },
  { label: 'Resolved',    done: false },
]

export default function DashboardPreview() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Admin Dashboard</p>
          <h2 className="mt-1.5 text-2xl font-bold text-slate-900 sm:text-3xl">Live complaint metrics.</h2>
          <p className="mt-2 text-sm text-slate-500">Real-time overview of all civic complaints across departments.</p>
        </div>
        <Link
          to="/admin"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Open Dashboard <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, delta, icon: Icon, accent, iconBg }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-slate-400">{label}</p>
                <p className={`mt-2 text-3xl font-bold ${accent}`}>{value}</p>
                <p className="mt-1 text-xs text-slate-400">{delta}</p>
              </div>
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg}`}>
                <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Complaint lifecycle */}
      <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-6">
        <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-400">Complaint Lifecycle</p>
        <div className="flex items-center gap-0">
          {lifecycle.map((step, i) => (
            <div key={step.label} className="flex flex-1 flex-col items-center">
              <div className="relative flex w-full items-center justify-center">
                {i > 0 && (
                  <div className={`absolute right-1/2 top-1/2 h-0.5 w-full -translate-y-1/2 transition-all ${step.done || step.active ? 'bg-emerald-400' : 'bg-slate-200'}`} />
                )}
                <div className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                  step.done
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : step.active
                    ? 'border-sky-500 bg-sky-500 text-white ring-4 ring-sky-100'
                    : 'border-slate-200 bg-white text-slate-400'
                }`}>
                  {step.done ? '✓' : i + 1}
                </div>
              </div>
              <span className={`mt-2 text-center text-[11px] font-medium ${
                step.active ? 'text-sky-600' : step.done ? 'text-emerald-600' : 'text-slate-400'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
