import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart3, MapPin, Clock3, ArrowRight } from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const statusStyle = (status) => {
  if (status === 'Resolved') return 'bg-emerald-100 text-emerald-800'
  if (status === 'In Progress') return 'bg-sky-100 text-sky-800'
  if (status === 'Submitted') return 'bg-slate-100 text-slate-800'
  if (status === 'Routed') return 'bg-amber-100 text-amber-800'
  return 'bg-slate-100 text-slate-800'
}

export default function Tracking() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API_BASE_URL}/api/complaints/user/1`)
      setItems(res.data)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const counts = items.reduce(
    (acc, complaint) => {
      acc.total += 1
      acc[complaint.status] = (acc[complaint.status] || 0) + 1
      return acc
    },
    { total: 0 }
  )

  return (
    <div className="space-y-8">
      <section className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-950">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Complaint tracking</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Your submitted reports, realtime status updates.</h1>
            <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">Monitor issue routing, severity, and progress from the moment you file a complaint until it is resolved.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <BarChart3 className="h-5 w-5 text-emerald-600" /> Real-time status view
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total reports</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{counts.total}</p>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">In progress</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{counts['In Progress'] || 0}</p>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Routed</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{counts.Routed || 0}</p>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Resolved</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{counts.Resolved || 0}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          {loading ? (
            <div className="card text-slate-700 dark:text-slate-200">Loading complaints…</div>
          ) : items.length === 0 ? (
            <div className="rounded-[36px] border border-slate-200 bg-white p-10 text-center shadow-xl shadow-slate-200/20 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">No reports yet</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">You have not submitted any complaints.</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">Use the report flow to capture an issue and get it routed through JanSetu AI.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((it) => (
                <div key={it.id} className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{it.complaint_id}</h3>
                        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${statusStyle(it.status)}`}>{it.status}</span>
                      </div>
                      <p className="mt-3 text-slate-600 dark:text-slate-400">{it.category} • {it.severity}</p>
                      <p className="mt-4 text-slate-700 dark:text-slate-300">{it.summary}</p>
                    </div>
                    <div className="grid gap-3 rounded-[28px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                      <div className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <MapPin className="h-4 w-4" /> <span>{it.location || 'No location provided'}</span>
                      </div>
                      <div className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <Clock3 className="h-4 w-4" /> <span>{new Date(it.created_at || it.created_at || Date.now()).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="rounded-[36px] border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3 text-slate-900 dark:text-white">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10">📍</span>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-indigo-600">Stay informed</p>
              <h2 className="mt-2 text-xl font-semibold">Track every update instantly</h2>
            </div>
          </div>
          <p className="mt-5 text-slate-600 dark:text-slate-400">JanSetu keeps history, routing status and department assignments visible for every complaint you file.</p>
          <div className="mt-6 space-y-4">
            <div className="rounded-[28px] bg-white p-4 shadow-sm dark:bg-slate-950">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Ready for action</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Get notifications when your report moves to a new department.</p>
            </div>
            <div className="rounded-[28px] bg-white p-4 shadow-sm dark:bg-slate-950">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Clear ownership</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">See who is responsible and when the issue was last updated.</p>
            </div>
          </div>
          <button className="btn mt-6 inline-flex items-center gap-2" onClick={fetchUser}>
            <ArrowRight className="h-4 w-4" /> Refresh status
          </button>
        </aside>
      </section>
    </div>
  )
}
