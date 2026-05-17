import { categories } from '../data/landingData'
import { MapPin, Trash2, Droplet, Zap, Flame, Slash, TreeDeciduous, Skull, Moon } from 'lucide-react'

const iconMap = {
  'Pothole / Road Damage': MapPin,
  'Garbage Accumulation': Trash2,
  'Water Leakage': Droplet,
  'Damaged Electric Wire': Zap,
  'Fire / Smoke': Flame,
  'Illegal Parking': Slash,
  'Fallen Tree': TreeDeciduous,
  'Dead Animal': Skull,
  'Broken Streetlight': Moon,
  'Drainage Overflow': Droplet,
}

export default function CategoryGrid() {
  return (
    <section id="categories" className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Departments</p>
        <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">Complaint categories matched to government departments.</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((item) => {
          const Icon = iconMap[item.title] || Road
          return (
            <div key={item.title} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{item.department}</p>
              <span className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">Severity: {item.severity}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
