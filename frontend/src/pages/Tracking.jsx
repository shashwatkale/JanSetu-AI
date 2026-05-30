import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { MapPin, Clock3, ArrowRight, RefreshCw, Eye, X, Calendar, Building2 } from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const statusStyle = (s) => ({
  Resolved:     'bg-emerald-100 text-emerald-700',
  'In Progress':'bg-sky-100    text-sky-700',
  Submitted:    'bg-slate-100  text-slate-700',
  Routed:       'bg-amber-100  text-amber-700',
}[s] || 'bg-slate-100 text-slate-700')

const severityStyle = (s) => ({
  Critical: 'bg-rose-100   text-rose-700',
  High:     'bg-orange-100 text-orange-700',
  Severe:   'bg-red-100    text-red-700',
  Medium:   'bg-yellow-100 text-yellow-700',
  Low:      'bg-green-100  text-green-700',
}[s] || 'bg-slate-100 text-slate-700')

/* ── Progress stages ── */
const STAGES = ['Submitted', 'Routed', 'In Progress', 'Resolved']

function ProgressBar({ status }) {
  const currentIdx = STAGES.indexOf(status)
  return (
    <div className="flex items-center gap-0">
      {STAGES.map((stage, i) => {
        const done   = i <= currentIdx
        const active = i === currentIdx
        return (
          <React.Fragment key={stage}>
            <div className="flex flex-col items-center gap-1.5">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                done
                  ? active
                    ? 'border-sky-500 bg-sky-500 text-white ring-4 ring-sky-100'
                    : 'border-emerald-500 bg-emerald-500 text-white'
                  : 'border-slate-200 bg-white text-slate-400'
              }`}>
                {done && !active ? '✓' : i + 1}
              </div>
              <span className={`text-center text-[10px] font-medium w-16 leading-tight ${
                active ? 'text-sky-600' : done ? 'text-emerald-600' : 'text-slate-400'
              }`}>{stage}</span>
            </div>
            {i < STAGES.length - 1 && (
              <div className={`mb-5 h-0.5 flex-1 transition-all ${i < currentIdx ? 'bg-emerald-400' : 'bg-slate-200'}`} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

/* ── Detail Modal ── */
function DetailModal({ item, onClose }) {
  if (!item) return null
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Complaint Details</p>
            <p className="mt-0.5 font-mono text-sm font-bold text-slate-900">{item.complaint_id}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[78vh] overflow-y-auto px-6 py-5 space-y-5">
          {/* Progress */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Progress</p>
            <ProgressBar status={item.status} />
          </div>

          {/* Uploaded image */}
          {item.image_path && (
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <img
                src={`${API_BASE}/uploads/${item.image_path.split('/').pop()}`}
                alt="Complaint"
                className="h-44 w-full object-cover"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            </div>
          )}

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Issue Type',  value: item.category },
              { label: 'Department',  value: item.department },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-400">{label}</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{value || '—'}</p>
              </div>
            ))}
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-400">Severity</p>
              <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${severityStyle(item.severity)}`}>
                {item.severity}
              </span>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-400">Status</p>
              <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyle(item.status)}`}>
                {item.status}
              </span>
            </div>
          </div>

          {/* Location & date */}
          <div className="space-y-2">
            {item.location && (
              <div className="flex items-start gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <span>{item.location}</span>
              </div>
            )}
            {item.created_at && (
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <Calendar className="h-4 w-4 shrink-0 text-slate-400" />
                <span>
                  {new Date(item.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                </span>
              </div>
            )}
            {item.department && (
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <Building2 className="h-4 w-4 shrink-0 text-slate-400" />
                <span>{item.department}</span>
              </div>
            )}
          </div>

          {/* Summary */}
          {item.summary && (
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <p className="text-xs font-medium text-slate-400 mb-1.5">Description</p>
              <p className="text-sm leading-relaxed text-slate-700">{item.summary}</p>
            </div>
          )}

          {/* Recommended action */}
          {item.recommended_action && (
            <div className="rounded-xl border-l-4 border-emerald-500 bg-emerald-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-1.5">Recommended Action</p>
              <p className="text-sm leading-relaxed text-slate-700">{item.recommended_action}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Main Tracking Page ── */
export default function Tracking() {
  const [items, setItems]     = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  const fetchUser = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API_BASE_URL}/api/complaints/user/1`)
      setItems(res.data)
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  useEffect(() => { fetchUser() }, [])

  const counts = items.reduce((acc, c) => {
    acc.total += 1
    acc[c.status] = (acc[c.status] || 0) + 1
    return acc
  }, { total: 0 })

  return (
    <>
      {selected && <DetailModal item={selected} onClose={() => setSelected(null)} />}

      <div className="mx-auto max-w-3xl space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">My Reports</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">Complaint Tracking</h1>
          </div>
          <button
            onClick={fetchUser}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total',       value: counts.total,                color: 'text-slate-900'  },
            { label: 'In Progress', value: counts['In Progress'] || 0,  color: 'text-sky-600'    },
            { label: 'Routed',      value: counts.Routed || 0,          color: 'text-amber-600'  },
            { label: 'Resolved',    value: counts.Resolved || 0,        color: 'text-emerald-600'},
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-widest text-slate-400">{label}</p>
              <p className={`mt-1.5 text-2xl font-semibold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="flex items-center justify-center py-16 text-sm text-slate-400">
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Loading complaints…
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-900">No complaints yet</p>
            <p className="mt-1 text-sm text-slate-500">Submit your first report to get started.</p>
            <Link to="/new" className="btn-success mt-5 inline-flex items-center gap-2">
              Report an Issue <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((it) => (
              <div
                key={it.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm font-bold text-slate-900">{it.complaint_id}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyle(it.status)}`}>
                        {it.status}
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${severityStyle(it.severity)}`}>
                        {it.severity}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-700">{it.category}</p>
                    {it.summary && (
                      <p className="text-sm text-slate-500 line-clamp-2">{it.summary}</p>
                    )}
                  </div>

                  <button
                    onClick={() => setSelected(it)}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <Eye className="h-3.5 w-3.5" /> View Details
                  </button>
                </div>

                {/* Mini progress */}
                <div className="mt-4">
                  <div className="flex gap-1">
                    {STAGES.map((stage, i) => {
                      const idx  = STAGES.indexOf(it.status)
                      const done = i <= idx
                      return (
                        <div
                          key={stage}
                          title={stage}
                          className={`h-1.5 flex-1 rounded-full transition-all ${done ? 'bg-emerald-500' : 'bg-slate-200'}`}
                        />
                      )
                    })}
                  </div>
                  <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                    <span>Submitted</span><span>Resolved</span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
                  {it.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="truncate max-w-[200px]">{it.location.split(',')[0]}</span>
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    {new Date(it.created_at || Date.now()).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                  </span>
                  {it.department && <span>→ {it.department}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
