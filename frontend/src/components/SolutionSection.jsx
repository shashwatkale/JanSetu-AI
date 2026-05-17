import { solutionSteps } from '../data/landingData'
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin, Layers } from 'lucide-react'

const stepIcons = {
  'Upload Image': MapPin,
  'AI Analysis': ShieldCheck,
  'Department Routing': Layers,
  'Track Status': CheckCircle2,
}

export default function SolutionSection() {
  return (
    <section className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Solution</p>
          <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">One photo. One AI analysis. Correct department routing.</h2>
          <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">JanSetu AI simplifies the civic complaint workflow for citizens and government teams alike.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {solutionSteps.map((item) => {
            const Icon = stepIcons[item.title] || ArrowRight
            return (
              <div key={item.title} className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-sm font-semibold text-slate-950 dark:text-white">{item.title}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
