const steps = [
  { label: 'Submitted', status: 'done' },
  { label: 'AI Verified', status: 'done' },
  { label: 'Routed', status: 'done' },
  { label: 'Acknowledged', status: 'active' },
  { label: 'In Progress', status: 'pending' },
  { label: 'Resolved', status: 'pending' },
]

export default function TrackingTimeline() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Tracking</p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-900">Complaint lifecycle at a glance.</h2>
      </div>

      <div className="relative flex items-start justify-between gap-2 overflow-x-auto pb-2">
        {steps.map((step, i) => (
          <div key={step.label} className="flex min-w-[80px] flex-1 flex-col items-center gap-2">
            {/* connector line */}
            <div className="relative flex w-full items-center justify-center">
              {i > 0 && (
                <div className={`absolute right-1/2 top-1/2 h-0.5 w-full -translate-y-1/2 ${step.status === 'pending' ? 'bg-slate-200' : 'bg-emerald-400'}`} />
              )}
              <div
                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                  step.status === 'done'
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : step.status === 'active'
                    ? 'border-sky-500 bg-sky-500 text-white ring-4 ring-sky-100'
                    : 'border-slate-200 bg-white text-slate-400'
                }`}
              >
                {step.status === 'done' ? '✓' : i + 1}
              </div>
            </div>
            <span className={`text-center text-xs font-medium ${step.status === 'pending' ? 'text-slate-400' : step.status === 'active' ? 'text-sky-600' : 'text-slate-700'}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
