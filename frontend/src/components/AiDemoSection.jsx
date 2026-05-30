import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ShieldCheck, Loader2, Play, CheckCircle2, GitBranch, AlertTriangle } from 'lucide-react'

const DEMO_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=70',
    label: 'Road Damage',
    result: {
      category: 'Pothole / Road Damage',
      severity: 'High',
      severityColor: 'bg-orange-100 text-orange-700',
      department: 'Municipal Corporation / PWD',
      action: 'Inspect the road section and arrange patching if required.',
      summary: 'The user reported road damage with visible potholes. The uploaded image shows significant surface deterioration. The issue has been routed to Municipal Corporation / PWD.',
    },
  },
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=70',
    label: 'Garbage Dump',
    result: {
      category: 'Garbage Accumulation',
      severity: 'Medium',
      severityColor: 'bg-yellow-100 text-yellow-700',
      department: 'Sanitation Department',
      action: 'Inspect the reported location and schedule waste collection if required.',
      summary: 'The user reported garbage accumulation at the location. The uploaded image shows visible waste materials. The issue has been categorized under Sanitation Department for review.',
    },
  },
  {
    src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=70',
    label: 'Water Leakage',
    result: {
      category: 'Water Leakage',
      severity: 'Medium',
      severityColor: 'bg-yellow-100 text-yellow-700',
      department: 'Water Department',
      action: 'Dispatch a water department crew to locate and repair the reported leakage.',
      summary: 'The user reported a water leakage issue. The uploaded image shows water pooling on the surface. The issue has been routed to the Water Department for inspection.',
    },
  },
]

const STEPS = ['Uploading image...', 'Running AI analysis...', 'Detecting issue type...', 'Routing to department...', 'Generating complaint...']

export default function AiDemoSection() {
  const [activeImg, setActiveImg] = useState(0)
  const [phase, setPhase]         = useState('idle')   // idle | loading | result
  const [stepIdx, setStepIdx]     = useState(0)
  const [result, setResult]       = useState(null)

  const runDemo = () => {
    if (phase === 'loading') return
    setPhase('loading')
    setResult(null)
    setStepIdx(0)

    let i = 0
    const tick = setInterval(() => {
      i++
      setStepIdx(i)
      if (i >= STEPS.length - 1) {
        clearInterval(tick)
        setTimeout(() => {
          setResult(DEMO_IMAGES[activeImg].result)
          setPhase('result')
        }, 400)
      }
    }, 500)
  }

  const reset = () => { setPhase('idle'); setResult(null); setStepIdx(0) }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Interactive Demo</p>
          <h2 className="mt-1.5 text-2xl font-bold text-slate-900 sm:text-3xl">
            See the AI in action.
          </h2>
          <p className="mt-2 max-w-md text-sm text-slate-500">
            Select a sample image, click Analyze, and watch JanSetu AI detect, classify, and route the complaint in real time.
          </p>
        </div>
        {phase === 'result' && (
          <button onClick={reset} className="shrink-0 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
            Try another →
          </button>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        {/* Left — image selector */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Select a sample issue</p>
          <div className="grid grid-cols-3 gap-2">
            {DEMO_IMAGES.map((img, i) => (
              <button
                key={img.label}
                onClick={() => { setActiveImg(i); reset() }}
                className={`group relative overflow-hidden rounded-xl border-2 transition ${
                  activeImg === i ? 'border-emerald-500 shadow-md shadow-emerald-100' : 'border-transparent hover:border-slate-300'
                }`}
              >
                <img src={img.src} alt={img.label} className="h-20 w-full object-cover" />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-2">
                  <span className="text-[10px] font-semibold text-white">{img.label}</span>
                </div>
                {activeImg === i && (
                  <div className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500">
                    <CheckCircle2 className="h-3 w-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Selected image preview */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200">
            <img
              src={DEMO_IMAGES[activeImg].src}
              alt="Selected"
              className="h-52 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span className="rounded-lg bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {DEMO_IMAGES[activeImg].label}
              </span>
              {phase === 'idle' && (
                <button
                  onClick={runDemo}
                  className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400"
                >
                  <Play className="h-3 w-3" /> Analyze
                </button>
              )}
            </div>
          </div>

          {phase === 'idle' && (
            <button
              onClick={runDemo}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Sparkles className="h-4 w-4 text-emerald-400" /> Run AI Analysis
            </button>
          )}
        </div>

        {/* Right — result panel */}
        <div className="min-h-[320px]">
          <AnimatePresence mode="wait">
            {phase === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
                  <Sparkles className="h-7 w-7 text-emerald-500" />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-700">AI Analysis Results</p>
                <p className="mt-1.5 text-xs text-slate-400">Select an image and click "Run AI Analysis" to see the output</p>
              </motion.div>
            )}

            {phase === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex h-full min-h-[320px] flex-col justify-center rounded-2xl border border-slate-200 bg-slate-50 p-8"
              >
                <div className="mb-6 flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
                  <span className="text-sm font-semibold text-slate-700">Processing with AI...</span>
                </div>
                <div className="space-y-3">
                  {STEPS.map((step, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: i <= stepIdx ? 1 : 0.25, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                        i < stepIdx
                          ? 'bg-emerald-500 text-white'
                          : i === stepIdx
                          ? 'border-2 border-emerald-500 bg-white text-emerald-600'
                          : 'border-2 border-slate-200 bg-white text-slate-400'
                      }`}>
                        {i < stepIdx ? '✓' : i + 1}
                      </div>
                      <span className={`text-sm ${i <= stepIdx ? 'text-slate-700' : 'text-slate-400'}`}>{step}</span>
                      {i === stepIdx && <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-500" />}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {phase === 'result' && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-emerald-200 bg-white shadow-sm overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">AI Analysis Complete</span>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Routed
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[10px] font-medium text-slate-400">Issue Type</p>
                      <p className="mt-1 text-xs font-bold text-slate-900 leading-tight">{result.category}</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[10px] font-medium text-slate-400">Severity</p>
                      <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${result.severityColor}`}>
                        {result.severity}
                      </span>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[10px] font-medium text-slate-400">Department</p>
                      <p className="mt-1 text-xs font-bold text-sky-700 leading-tight">{result.department}</p>
                    </div>
                  </div>

                  <div className="rounded-xl border-l-4 border-emerald-500 bg-emerald-50 px-4 py-3">
                    <div className="mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-emerald-600" />
                      <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">Recommended Action</p>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-700">{result.action}</p>
                  </div>

                  <div className="rounded-xl bg-slate-50 px-4 py-3">
                    <p className="text-[10px] font-medium text-slate-400 mb-1">AI Summary</p>
                    <p className="text-xs leading-relaxed text-slate-600">{result.summary}</p>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3">
                    <GitBranch className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span className="text-xs font-semibold text-slate-200">
                      Complaint auto-generated & routed to {result.department}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
