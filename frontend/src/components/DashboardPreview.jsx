import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const stats = [
  { label: 'Total Complaints', value: '1,240', accent: 'text-slate-900' },
  { label: 'In Progress', value: '68', accent: 'text-sky-600' },
  { label: 'Resolved', value: '1,088', accent: 'text-emerald-600' },
  { label: 'Critical Issues', value: '32', accent: 'text-rose-600' },
]

export default function DashboardPreview() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Dashboard</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-900">Live complaint metrics.</h2>
        </div>
        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          View Admin <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, accent }) => (
          <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400">{label}</p>
            <p className={`mt-2 text-3xl font-semibold ${accent}`}>{value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
