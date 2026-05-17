import { techStacks } from '../data/landingData'
import { Cpu, ServerCog, Cloud, Terminal, GitBranch, ShieldCheck } from 'lucide-react'

const techIcons = [Cpu, ServerCog, Cloud, Terminal, GitBranch, ShieldCheck]

export default function TechStackSection() {
  return (
    <section className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Free AI Stack</p>
        <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">Built to run on free and open AI tools.</h2>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3 xl:grid-cols-6">
        {techStacks.map((item, index) => {
          const Icon = techIcons[index] || ShieldCheck
          return (
            <div key={item} className="rounded-[30px] border border-slate-200 bg-slate-50 p-5 text-center transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold text-slate-950 dark:text-white">{item}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
