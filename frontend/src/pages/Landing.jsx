import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import StatsStrip from '../components/StatsStrip'
import ProblemCards from '../components/ProblemCards'
import SolutionSection from '../components/SolutionSection'
import FeatureGrid from '../components/FeatureGrid'
import CategoryGrid from '../components/CategoryGrid'
import AiDemoSection from '../components/AiDemoSection'
import DashboardPreview from '../components/DashboardPreview'
import TrackingTimeline from '../components/TrackingTimeline'
import TechStackSection from '../components/TechStackSection'

export default function Landing() {
  return (
    <div className="space-y-10 pb-16">
      <HeroSection />

      <StatsStrip />

      <ProblemCards />

      <SolutionSection />

      <CategoryGrid />

      <FeatureGrid />

      <AiDemoSection />

      <DashboardPreview />

      <TrackingTimeline />

      <TechStackSection />

      <section className="rounded-[36px] border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Get Started</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Turn citizen reports into faster civic action.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">JanSetu AI helps residents report issues faster and gives local authorities the intelligence they need to respond with confidence.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/new" className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">Report an Issue</Link>
            <Link to="/tracking" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">Track a Complaint</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
