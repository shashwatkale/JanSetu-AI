import { Link } from 'react-router-dom'
import { footerLinks } from '../data/landingData'
import { Github, Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950/95 px-4 py-16 text-slate-300 dark:border-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 rounded-3xl bg-emerald-600 px-4 py-3 text-white shadow-lg shadow-emerald-500/20">
            <span className="text-lg font-semibold">JanSetu AI</span>
          </div>
          <p className="max-w-sm text-sm leading-7 text-slate-400">AI-powered civic complaint detection and routing platform built for citizens and government teams.</p>
          <div className="flex items-center gap-3 text-slate-400">
            <a href="#" className="transition hover:text-white"><Github className="h-5 w-5" /></a>
            <a href="#" className="transition hover:text-white"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="transition hover:text-white"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="transition hover:text-white"><Youtube className="h-5 w-5" /></a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Product</h3>
          <div className="mt-6 space-y-3 text-sm text-slate-400">
            {footerLinks.product.map((item) => (
              <Link key={item.label} to={item.href} className="block transition hover:text-white">{item.label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Categories</h3>
          <div className="mt-6 space-y-3 text-sm text-slate-400">
            {footerLinks.categories.map((item) => (
              <Link key={item.label} to={item.href} className="block transition hover:text-white">{item.label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Support</h3>
          <div className="mt-6 space-y-3 text-sm text-slate-400">
            {footerLinks.support.map((item) => (
              <Link key={item.label} to={item.href} className="block transition hover:text-white">{item.label}</Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-16 border-t border-slate-800 pt-6 text-sm text-slate-500">© 2024 JanSetu AI. All rights reserved.</div>
    </footer>
  )
}
