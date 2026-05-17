import React from 'react'
import { Link } from 'react-router-dom'

const tiles = [
  { title: 'Pothole / Road Damage', description: 'Report damaged roads and potholes for repair.' },
  { title: 'Garbage Accumulation', description: 'Capture trash buildup and improve cleanliness.' },
  { title: 'Water Leakage', description: 'Detect leaks and service broken water lines.' },
  { title: 'Fire / Smoke', description: 'Alert authorities fast about fire hazards.' },
]

export default function Landing(){
  return (
    <div className="space-y-8">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">AI Smart Complaint Routing</span>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Transform civic issue reporting with AI.</h2>
            <p className="max-w-2xl text-lg text-slate-600">Upload an image of a civic issue and JanSetu AI will analyze it, categorize the problem, predict severity, and route it to the right department automatically.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="btn bg-indigo-600 text-white hover:bg-indigo-700" to="/new">File a Complaint</Link>
            <Link className="btn btn-secondary" to="/tracking">Track Complaints</Link>
          </div>
        </div>

        <div className="rounded-[36px] bg-gradient-to-tr from-slate-900 via-indigo-800 to-indigo-600 p-8 text-white shadow-xl shadow-indigo-200/20">
          <h3 className="text-2xl font-semibold">AI Workflow</h3>
          <ol className="mt-6 space-y-4 text-sm leading-7 text-slate-100">
            <li><span className="font-semibold">1.</span> Upload image of the issue.</li>
            <li><span className="font-semibold">2.</span> AI captions and categorizes automatically.</li>
            <li><span className="font-semibold">3.</span> Severity and department routing are determined.</li>
            <li><span className="font-semibold">4.</span> Submit complaint and track status live.</li>
          </ol>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map(tile => (
          <div key={tile.title} className="card border-slate-200 hover:border-indigo-500 hover:shadow-lg transition">
            <h4 className="text-lg font-semibold text-slate-900">{tile.title}</h4>
            <p className="mt-3 text-slate-600">{tile.description}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="card">
          <h3 className="text-2xl font-semibold text-slate-900">Complete complaint management for citizens and admins</h3>
          <p className="mt-4 text-slate-600">This MVP combines a clean citizen experience with an admin dashboard so government teams can monitor complaints, update statuses, and respond faster.</p>
        </div>
        <div className="grid gap-4">
          <div className="card bg-slate-950 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-300">AI categories</p>
            <p className="mt-2 text-xl font-semibold">Pothole, Garbage, Water Leak, Fire, Parking, Trees</p>
          </div>
          <div className="card bg-slate-950 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Quick status</p>
            <p className="mt-2 text-xl font-semibold">Submitted, Routed, In Progress, Resolved</p>
          </div>
        </div>
      </section>
    </div>
  )
}
