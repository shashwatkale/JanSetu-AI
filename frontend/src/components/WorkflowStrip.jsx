import { Upload, Cpu, GitBranch, CheckCircle2 } from 'lucide-react'

const steps = [
  { icon: Upload, label: 'Upload Photo', desc: 'Capture any civic issue' },
  { icon: Cpu, label: 'AI Analysis', desc: 'Detect, classify & score severity' },
  { icon: GitBranch, label: 'Auto Routing', desc: 'Sent to correct department' },
  { icon: CheckCircle2, label: 'Track & Resolve', desc: 'Monitor until closed' },
]

export default function WorkflowStrip() {
  return (
    <section id="how-it-works" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-emerald-600">How it works</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ icon: Icon, label, desc }, i) => (
          <div key={label} className="relative flex flex-col items-center gap-3 rounded-2xl bg-slate-50 p-5 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-700">
              <Icon className="h-5 w-5" />
            </div>
            <span className="absolute -top-2.5 left-4 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
              {i + 1}
            </span>
            <p className="text-sm font-semibold text-slate-900">{label}</p>
            <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
