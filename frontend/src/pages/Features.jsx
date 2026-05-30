import { Cpu, GitBranch, MapPin, FileText, BarChart3, LayoutDashboard } from 'lucide-react'

const features = [
  {
    icon: Cpu,
    title: 'AI Image Analysis',
    desc: 'Upload any civic issue photo. Our AI automatically identifies the problem type, generates a caption, and classifies it — no manual input needed.',
    color: 'bg-emerald-50 text-emerald-700',
    border: 'border-emerald-200',
  },
  {
    icon: GitBranch,
    title: 'Smart Department Routing',
    desc: 'Every complaint is automatically routed to the correct government department based on issue type — Municipal, PWD, Electricity, Sanitation, and more.',
    color: 'bg-sky-50 text-sky-700',
    border: 'border-sky-200',
  },
  {
    icon: MapPin,
    title: 'GPS Location Detection',
    desc: 'Auto-detect your precise location with one tap, or search and select manually. Location is attached to every complaint for faster field response.',
    color: 'bg-violet-50 text-violet-700',
    border: 'border-violet-200',
  },
  {
    icon: FileText,
    title: 'Complaint Auto-Generation',
    desc: 'A structured, formal complaint is generated automatically from your photo — including issue type, severity, location, and a concise summary.',
    color: 'bg-amber-50 text-amber-700',
    border: 'border-amber-200',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Tracking',
    desc: 'Track every complaint from submission to resolution with a visual progress bar. Know exactly which stage your report is at — always.',
    color: 'bg-rose-50 text-rose-700',
    border: 'border-rose-200',
  },
  {
    icon: LayoutDashboard,
    title: 'Admin Dashboard',
    desc: 'Government teams get a clean dashboard with search, filters, pagination, and one-click status updates to manage the full complaint lifecycle.',
    color: 'bg-teal-50 text-teal-700',
    border: 'border-teal-200',
  },
]

export default function Features() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 pb-16">
      {/* Header */}
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Platform</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Core Features</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-500 max-w-lg mx-auto">
          Six capabilities that make JanSetu AI the fastest way to report, route, and resolve civic issues.
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, desc, color, border }) => (
          <div
            key={title}
            className={`group rounded-2xl border ${border} bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
          >
            <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${color} transition group-hover:scale-110`}>
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">{desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-slate-50 p-8 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">See it in action</h2>
        <p className="mt-2 text-sm text-slate-500">Report a real civic issue and watch the AI pipeline work end-to-end.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a href="/new" className="btn-success inline-flex items-center gap-2">
            Report an Issue
          </a>
          <a href="/how-it-works" className="btn inline-flex items-center gap-2">
            How It Works
          </a>
        </div>
      </div>
    </div>
  )
}
