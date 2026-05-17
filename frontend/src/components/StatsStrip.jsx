import { trustStats } from '../data/landingData'

export default function StatsStrip() {
  return (
    <section className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950">
      <div className="grid gap-4 md:grid-cols-5">
        {trustStats.map((item) => (
          <div key={item.label} className="rounded-[28px] border border-slate-100 bg-slate-50 p-5 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="text-3xl font-semibold text-slate-950 dark:text-white">{item.value}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
