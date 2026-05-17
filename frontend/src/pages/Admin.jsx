import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ShieldCheck, ClipboardList, Users, CheckCircle2, ArrowRight } from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const badgeClass = (status) => {
  if (status === 'Resolved') return 'bg-emerald-100 text-emerald-800'
  if (status === 'In Progress') return 'bg-sky-100 text-sky-800'
  if (status === 'Routed') return 'bg-amber-100 text-amber-800'
  if (status === 'Submitted') return 'bg-slate-100 text-slate-800'
  return 'bg-slate-100 text-slate-800'
}

const severityClass = (severity) => {
  if (severity === 'Critical') return 'bg-rose-100 text-rose-700'
  if (severity === 'High') return 'bg-orange-100 text-orange-700'
  if (severity === 'Medium') return 'bg-amber-100 text-amber-700'
  return 'bg-emerald-100 text-emerald-700'
}

export default function Admin() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/complaints`)
      setItems(res.data)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/api/admin/complaints/${id}/status`, {
        status,
        remarks: '',
        updated_by: 'admin',
      })
      fetchAll()
    } catch (e) {
      console.error(e)
    }
  }

  const summary = items.reduce(
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
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Admin dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Manage civic issues with clarity and speed.</h1>
            <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">Review incoming complaints, confirm routing, and resolve issues from a single admin view.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            <ShieldCheck className="h-4 w-4" /> Civic response ready
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total complaints</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{summary.total}</p>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Submitted</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{summary.Submitted || 0}</p>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">In Progress</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{summary['In Progress'] || 0}</p>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Resolved</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{summary.Resolved || 0}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Incoming complaints</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Action complaints as soon as they are routed to the right department.</p>
            </div>
            <button className="btn inline-flex items-center gap-2" onClick={fetchAll} disabled={loading}>
              <ArrowRight className="h-4 w-4" /> Refresh feed
            </button>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
              <thead className="bg-slate-50 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-4">Complaint</th>
                  <th className="px-4 py-4">Category</th>
                  <th className="px-4 py-4">Department</th>
                  <th className="px-4 py-4">Severity</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950">
                {items.map((it) => (
                  <tr key={it.id}>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-slate-900 dark:text-white">{it.complaint_id}</div>
                      <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{it.location || 'No location specified'}</div>
                    </td>
                    <td className="px-4 py-4 text-slate-700 dark:text-slate-300">{it.category}</td>
                    <td className="px-4 py-4 text-slate-700 dark:text-slate-300">{it.department}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${severityClass(it.severity)}`}>{it.severity}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${badgeClass(it.status)}`}>{it.status}</span>
                    </td>
                    <td className="px-4 py-4 space-x-2">
                      <button className="rounded-2xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800" onClick={() => updateStatus(it.id, 'Routed')}>Routed</button>
                      <button className="rounded-2xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-700" onClick={() => updateStatus(it.id, 'In Progress')}>In Progress</button>
                      <button className="rounded-2xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700" onClick={() => updateStatus(it.id, 'Resolved')}>Resolved</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[36px] border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Operations</p>
                <h2 className="mt-2 text-lg font-semibold">Fast triage cards</h2>
              </div>
            </div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Use status updates to keep the civic queue moving and reduce backlog.</p>
          </div>

          <div className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Insight</p>
              <ClipboardList className="h-5 w-5 text-slate-500" />
            </div>
            <div className="mt-5 space-y-4 text-slate-600 dark:text-slate-400">
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">Total items: <span className="font-semibold text-slate-900 dark:text-white">{summary.total}</span></div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">Awaiting review: <span className="font-semibold text-slate-900 dark:text-white">{summary.Submitted || 0}</span></div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">In progress: <span className="font-semibold text-slate-900 dark:text-white">{summary['In Progress'] || 0}</span></div>
            </div>
          </div>

          <div className="rounded-[36px] border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
              <Users className="h-5 w-5 text-indigo-600" />
              <p className="text-sm font-semibold">Admin Actions</p>
            </div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Keep the complaint lifecycle moving by marking high-priority cases resolved quickly.</p>
          </div>
        </aside>
      </section>
    </div>
  )
}
