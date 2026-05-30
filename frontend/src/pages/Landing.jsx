import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import HeroSection from '../components/HeroSection'
import WorkflowStrip from '../components/WorkflowStrip'
import FeatureGrid from '../components/FeatureGrid'
import AiDemoSection from '../components/AiDemoSection'
import DashboardPreview from '../components/DashboardPreview'
import TrackingTimeline from '../components/TrackingTimeline'

export default function Landing() {
  return (
    <div className="space-y-8 pb-16">
      <HeroSection />
      <WorkflowStrip />
      <FeatureGrid />
      <AiDemoSection />
      <DashboardPreview />
      <TrackingTimeline />

      {/* CTA */}
      <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-slate-50 p-8 shadow-sm">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Ready to report a civic issue?</h2>
            <p className="mt-1.5 text-sm text-slate-500">Upload a photo and let AI do the rest — in under 30 seconds.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/new"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-200 transition hover:bg-emerald-700"
            >
              Report an Issue <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/tracking"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Track Complaint
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
