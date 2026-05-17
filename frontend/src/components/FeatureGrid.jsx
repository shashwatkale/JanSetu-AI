import { featureList } from '../data/landingData'
import { Sparkles, Layers, ShieldCheck, MapPin, Activity, Clock3, AlertTriangle, ClipboardCheck, Globe2, Monitor } from 'lucide-react'

const iconMap = {
  'AI Image Captioning': Sparkles,
  'Complaint Category Detection': Layers,
  'Severity Prediction': ShieldCheck,
  'Department Routing': MapPin,
  'AI Complaint Summary': ClipboardCheck,
  'Location Tagging': Globe2,
  'Duplicate Complaint Detection': AlertTriangle,
  'Multi-Department Routing': Monitor,
  'Citizen Tracking': Activity,
  'Admin Dashboard': Layers,
  'SLA / Escalation Ready': Clock3,
  'Gemini API Ready': Sparkles,
}

export default function FeatureGrid() {
  return (
    <section id="features" className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Features</p>
        <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">Modern civic-tech features built for fast citizen service.</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featureList.map((item) => {
          const Icon = iconMap[item.title] || Sparkles
          return (
            <div key={item.title} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
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
