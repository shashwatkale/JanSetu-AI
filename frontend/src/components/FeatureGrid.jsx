import { Sparkles, Layers, ShieldCheck, MapPin, ClipboardCheck, Activity } from 'lucide-react'

const features = [
  { icon: Sparkles, title: 'AI Image Captioning', desc: 'Auto-describes issue photos for instant triage.' },
  { icon: Layers, title: 'Category Detection', desc: 'Classifies potholes, garbage, fire, leaks & more.' },
  { icon: ShieldCheck, title: 'Severity Prediction', desc: 'Assigns priority based on hazard and impact.' },
  { icon: MapPin, title: 'Smart Routing', desc: 'Routes each complaint to the correct department.' },
  { icon: ClipboardCheck, title: 'AI Complaint Summary', desc: 'Generates formal complaint text automatically.' },
  { icon: Activity, title: 'Real-time Tracking', desc: 'Citizens stay informed from submission to resolution.' },
]

export default function FeatureGrid() {
  return (
    <section id="features" className="space-y-5">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Features</p>
        <h2 className="text-2xl font-semibold text-slate-900">Everything needed for civic-tech at scale.</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-100">
              <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
            </div>
            <p className="text-sm font-semibold text-slate-900">{title}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
