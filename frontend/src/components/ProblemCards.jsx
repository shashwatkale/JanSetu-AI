import { Activity, Clock3, MapPin, FileText } from 'lucide-react'
import { problems } from '../data/landingData'

const iconMap = {
  MapPin: MapPin,
  Edit: FileText,
  Clock: Clock3,
  Activity: Activity,
}

export default function ProblemCards() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Problem</p>
        <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">Citizens should not need to know which department to contact.</h2>
        <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">JanSetu AI removes the guesswork with automatic department detection and complaint routing for every civic issue.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {problems.map((item) => {
          const Icon = iconMap[item.icon] || Activity
          return (
            <div key={item.title} className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
