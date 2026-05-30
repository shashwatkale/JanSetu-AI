import { motion } from 'framer-motion'
import { Sparkles, ClipboardCheck, Activity, GitBranch, ShieldCheck, LayoutDashboard } from 'lucide-react'

const citizen = [
  { icon: Sparkles,       title: 'AI Image Analysis',       desc: 'Upload any photo — AI identifies the issue, generates a caption, and classifies it instantly.' },
  { icon: ClipboardCheck, title: 'Complaint Auto-Generation', desc: 'A formal, structured complaint is generated automatically from your photo and description.' },
  { icon: Activity,       title: 'Real-Time Tracking',       desc: 'Track every complaint from submission to resolution with a live visual progress bar.' },
]

const government = [
  { icon: GitBranch,       title: 'Smart Routing',              desc: 'Every complaint is automatically routed to the correct department — no manual triage needed.' },
  { icon: ShieldCheck,     title: 'Priority-Based Resolution',   desc: 'Severity scoring ensures critical issues are escalated and resolved first.' },
  { icon: LayoutDashboard, title: 'Analytics Dashboard',         desc: 'Government teams get a clean dashboard with search, filters, and one-click status updates.' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

function FeatureCard({ icon: Icon, title, desc, accent }) {
  return (
    <motion.div
      variants={cardVariants}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${accent} transition group-hover:scale-110`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{desc}</p>
    </motion.div>
  )
}

export default function FeatureGrid() {
  return (
    <section id="features" className="space-y-8">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Features</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          Built for citizens and government teams.
        </h2>
        <p className="mt-2 text-sm text-slate-500">Six capabilities that make civic reporting faster, smarter, and more transparent.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Citizen side */}
        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/60 to-white p-6">
          <div className="mb-5 flex items-center gap-2">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">For Citizens</span>
          </div>
          <motion.div
            className="space-y-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            {citizen.map((f) => (
              <FeatureCard key={f.title} {...f} accent="bg-emerald-100 text-emerald-700" />
            ))}
          </motion.div>
        </div>

        {/* Government side */}
        <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50/60 to-white p-6">
          <div className="mb-5 flex items-center gap-2">
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-700">For Government</span>
          </div>
          <motion.div
            className="space-y-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            {government.map((f) => (
              <FeatureCard key={f.title} {...f} accent="bg-sky-100 text-sky-700" />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
