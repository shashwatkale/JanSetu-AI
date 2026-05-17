import { timelineSteps } from '../data/landingData'

export default function TrackingTimeline() {
  return (
    <section className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950">
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Tracking</p>
          <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">Track every complaint step from submission to resolution.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {timelineSteps.map((item) => (
            <div key={item.label} className={`rounded-[28px] border p-5 text-sm ${item.status === 'completed' ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-200' : item.status === 'active' ? 'border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-400/30 dark:bg-sky-500/10 dark:text-sky-200' : 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'}`}>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{item.label}</p>
              <p className="mt-3 text-sm leading-6">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
