import { aiDemo } from '../data/landingData'
import { Sparkles } from 'lucide-react'

export default function AiDemoSection() {
  return (
    <section className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">AI Analysis Demo</p>
          <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">See the AI complaint summary in a clean, mobile-friendly layout.</h2>
          <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">This interactive demo highlights the output citizens receive after uploading a civic issue photo.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
              <span>Upload preview</span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Photo</span>
            </div>
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=60" alt="Issue preview" className="h-52 w-full object-cover" />
            </div>
          </div>
          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-5 rounded-[28px] bg-slate-950/95 p-4 text-slate-100 shadow-lg shadow-slate-950/20">
              <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
                <span>AI Generated Output</span>
                <Sparkles className="h-5 w-5 text-emerald-400" />
              </div>
              <p className="text-sm text-slate-300">Instantly understand issue context and route complaints at scale.</p>
            </div>
            <div className="space-y-4">
              <div className="rounded-[24px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Caption</p>
                <p className="mt-2 text-base font-semibold text-slate-950 dark:text-white">{aiDemo.caption}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[24px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Category</p>
                  <p className="mt-2 font-semibold text-slate-950 dark:text-white">{aiDemo.category}</p>
                </div>
                <div className="rounded-[24px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Severity</p>
                  <p className="mt-2 font-semibold text-amber-600 dark:text-amber-300">{aiDemo.severity}</p>
                </div>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Department</p>
                <p className="mt-2 font-semibold text-slate-950 dark:text-white">{aiDemo.department}</p>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Summary</p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{aiDemo.summary}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
