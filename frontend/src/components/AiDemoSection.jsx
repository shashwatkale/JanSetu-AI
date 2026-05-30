import { Sparkles, ShieldCheck } from 'lucide-react'

const demo = {
  caption: 'Large pothole with uneven pavement visible on road surface.',
  category: 'Pothole / Road Damage',
  severity: 'Medium',
  department: 'Municipal Corporation / PWD',
  action: 'Schedule road repair within 48 hours.',
}

const severityColor = { Low: 'text-green-600 bg-green-50', Medium: 'text-amber-600 bg-amber-50', High: 'text-orange-600 bg-orange-50', Critical: 'text-rose-600 bg-rose-50' }

export default function AiDemoSection() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">AI Demo</p>
          <h2 className="text-2xl font-semibold text-slate-900">See what the AI returns in seconds.</h2>
          <p className="text-sm leading-relaxed text-slate-500">
            Upload any civic issue photo and receive a structured complaint with routing — no manual input needed.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">AI Analysis Result</span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <Sparkles className="h-3.5 w-3.5" /> Auto-generated
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <img
              src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=60"
              alt="Demo issue"
              className="h-40 w-full object-cover"
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-xs text-slate-400">Issue Type</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{demo.category}</p>
            </div>
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-xs text-slate-400">Severity</p>
              <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${severityColor[demo.severity]}`}>
                {demo.severity}
              </span>
            </div>
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-xs text-slate-400">Department</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{demo.department}</p>
            </div>
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-xs text-slate-400">Recommended Action</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{demo.action}</p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2">
            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-700">Complaint routed to Municipal Corporation</span>
          </div>
        </div>
      </div>
    </section>
  )
}
