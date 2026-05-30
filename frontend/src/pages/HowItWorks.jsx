import { Upload, Cpu, Building2, FileText, Send, BarChart3 } from 'lucide-react'
import { useState } from 'react'

const steps = [
  {
    icon: Upload,
    title: 'Upload Issue Image',
    desc: 'Take a photo of any civic problem — pothole, garbage, water leak, broken streetlight — and upload it directly from your phone or browser.',
    detail: 'Supports JPG, PNG, WEBP up to 10 MB. No account required to report.',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
  },
  {
    icon: Cpu,
    title: 'AI Detects the Problem',
    desc: 'JanSetu AI analyzes the image using computer vision to identify the issue type, generate a caption, and assess the context automatically.',
    detail: 'Powered by BLIP image captioning and rule-based classification. No manual input needed.',
    color: 'bg-sky-50 text-sky-700 border-sky-200',
    dot: 'bg-sky-500',
  },
  {
    icon: Building2,
    title: 'Department Identification',
    desc: 'Based on the detected issue, the AI maps it to the correct government department — Municipal Corporation, PWD, Electricity Board, and more.',
    detail: 'Routing logic covers 10+ civic categories across multiple departments.',
    color: 'bg-violet-50 text-violet-700 border-violet-200',
    dot: 'bg-violet-500',
  },
  {
    icon: FileText,
    title: 'Complaint Auto-Generation',
    desc: 'A formal complaint is generated automatically with issue type, severity, location, and a structured summary — no writing required.',
    detail: 'The complaint text is ready for official submission with a unique complaint ID.',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
  },
  {
    icon: Send,
    title: 'Complaint Submission',
    desc: 'Review the AI-generated complaint, confirm the details, and submit with one click. The complaint is logged and routed instantly.',
    detail: 'You receive a unique Complaint ID for tracking. Severity is set by you — not overridden by AI.',
    color: 'bg-rose-50 text-rose-700 border-rose-200',
    dot: 'bg-rose-500',
  },
  {
    icon: BarChart3,
    title: 'Track Progress',
    desc: 'Monitor your complaint through every stage — Submitted → Routed → In Progress → Resolved — with a real-time visual progress tracker.',
    detail: 'Access your complaint history anytime from the Tracking page using your Complaint ID.',
    color: 'bg-teal-50 text-teal-700 border-teal-200',
    dot: 'bg-teal-500',
  },
]

export default function HowItWorks() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="mx-auto max-w-2xl space-y-8 pb-16">
      {/* Header */}
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Process</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">How JanSetu AI Works</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          From photo to resolution — six steps that turn a citizen photo into a tracked government complaint.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-0 h-full w-0.5 bg-slate-200 sm:left-[23px]" />

        <div className="space-y-4">
          {steps.map((step, i) => {
            const Icon = step.icon
            const open = expanded === i
            return (
              <div key={step.title} className="relative flex gap-4 sm:gap-6">
                {/* Dot */}
                <div className={`relative z-10 mt-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${step.dot} shadow-sm`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>

                {/* Card */}
                <div
                  className={`flex-1 cursor-pointer rounded-2xl border p-5 transition-all hover:shadow-md ${step.color} ${open ? 'shadow-md' : 'shadow-sm'}`}
                  onClick={() => setExpanded(open ? null : i)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-widest opacity-60">Step {i + 1}</span>
                      <h3 className="mt-0.5 text-base font-semibold">{step.title}</h3>
                    </div>
                    <span className={`mt-1 text-lg font-bold opacity-40 transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed opacity-80">{step.desc}</p>

                  {open && (
                    <div className="mt-3 rounded-xl bg-white/60 px-4 py-3 text-sm leading-relaxed opacity-90">
                      {step.detail}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="text-sm font-semibold text-slate-900">Ready to report an issue?</p>
        <p className="mt-1 text-sm text-slate-500">It takes less than 30 seconds.</p>
        <a
          href="/new"
          className="btn-success mt-4 inline-flex items-center gap-2"
        >
          Report Now <Send className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
