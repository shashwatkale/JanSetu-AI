import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import {
  ShieldCheck, RefreshCw, Search, X, Eye,
  ChevronLeft, ChevronRight, AlertTriangle,
  CheckCircle2, Clock3, MapPin, Calendar,
} from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const PAGE_SIZE = 8

const statusStyle = (s) => ({
  Resolved:     'bg-emerald-100 text-emerald-700',
  'In Progress':'bg-sky-100    text-sky-700',
  Routed:       'bg-amber-100  text-amber-700',
  Submitted:    'bg-slate-100  text-slate-700',
}[s] || 'bg-slate-100 text-slate-700')

const severityStyle = (s) => ({
  Critical: 'bg-rose-100   text-rose-700',
  High:     'bg-orange-100 text-orange-700',
  Severe:   'bg-red-100    text-red-700',
  Medium:   'bg-yellow-100 text-yellow-700',
  Low:      'bg-green-100  text-green-700',
}[s] || 'bg-slate-100 text-slate-700')

const STATUS_OPTIONS = ['All', 'Submitted', 'Routed', 'In Progress', 'Resolved']

/* ── Detail Modal ── */
function DetailModal({ item, onClose, onUpdate }) {
  if (!item) return null

  const stages = ['Submitted', 'Routed', 'In Progress', 'Resolved']
  const currentIdx = stages.indexOf(item.status)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Complaint Details</p>
            <p className="mt-0.5 font-mono text-sm font-bold text-slate-900">{item.complaint_id}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto px-6 py-5 space-y-5">
          {/* Progress bar */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Progress</p>
            <div className="flex items-center gap-0">
              {stages.map((stage, i) => {
                const done   = i <= currentIdx
                const active = i === currentIdx
                return (
                  <React.Fragment key={stage}>
                    <div className="flex flex-col items-center gap-1.5">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                        done
                          ? active
                            ? 'border-sky-500 bg-sky-500 text-white ring-4 ring-sky-100'
                            : 'border-emerald-500 bg-emerald-500 text-white'
                          : 'border-slate-200 bg-white text-slate-400'
                      }`}>
                        {done && !active ? '✓' : i + 1}
                      </div>
                      <span className={`text-center text-[10px] font-medium leading-tight w-14 ${
                        active ? 'text-sky-600' : done ? 'text-emerald-600' : 'text-slate-400'
                      }`}>{stage}</span>
                    </div>
                    {i < stages.length - 1 && (
                      <div className={`mb-4 h-0.5 flex-1 ${i < currentIdx ? 'bg-emerald-400' : 'bg-slate-200'}`} />
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Issue Type',  value: item.category },
              { label: 'Department',  value: item.department },
              { label: 'Severity',    value: item.severity,  extra: <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${severityStyle(item.severity)}`}>{item.severity}</span> },
              { label: 'Status',      value: null,           extra: <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${statusStyle(item.status)}`}>{item.status}</span> },
            ].map(({ label, value, extra }) => (
              <div key={label} className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-400">{label}</p>
                {extra || <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>}
              </div>
            ))}
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
                <span>{new Date(item.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
              </div>
            )}
          </div>

          {/* Summary */}
          {item.summary && (
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <p className="text-xs font-medium text-slate-400 mb-1">Summary</p>
              <p className="text-sm leading-relaxed text-slate-700">{item.summary}</p>
            </div>
          )}

          {/* Recommended action */}
          {item.recommended_action && (
            <div className="rounded-xl border-l-4 border-emerald-500 bg-emerald-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-1">Recommended Action</p>
              <p className="text-sm leading-relaxed text-slate-700">{item.recommended_action}</p>
            </div>
          )}

          {/* Status update */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">Update Status</p>
            <div className="flex flex-wrap gap-2">
              {['Routed', 'In Progress', 'Resolved'].map((s) => (
                <button
                  key={s}
                  onClick={() => { onUpdate(item.id, s); onClose() }}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition hover:opacity-80 ${statusStyle(s)}`}
                >
                  Mark {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main Admin Page ── */
export default function Admin() {
  const [items, setItems]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState('All')
  const [page, setPage]         = useState(1)
  const [selected, setSelected] = useState(null)

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/complaints`)
      setItems(res.data)
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/api/admin/complaints/${id}/status`, {
        status, remarks: '', updated_by: 'admin',
      })
      fetchAll()
    } catch (e) { console.error(e) }
  }

  const summary = useMemo(() => items.reduce((acc, c) => {
    acc.total += 1
    acc[c.status] = (acc[c.status] || 0) + 1
    if (c.severity === 'Critical' || c.severity === 'Severe') acc.critical += 1
    return acc
  }, { total: 0, critical: 0 }), [items])

  const filtered = useMemo(() => {
    let list = items
    if (filter !== 'All') list = list.filter((c) => c.status === filter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((c) =>
        c.complaint_id?.toLowerCase().includes(q) ||
        c.category?.toLowerCase().includes(q) ||
        c.department?.toLowerCase().includes(q) ||
        c.location?.toLowerCase().includes(q)
      )
    }
    return list
  }, [items, filter, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // reset page on filter/search change
  useEffect(() => setPage(1), [filter, search])

  const stats = [
    { label: 'Total',       value: summary.total,                  color: 'text-slate-900' },
    { label: 'In Progress', value: summary['In Progress'] || 0,    color: 'text-sky-600'   },
    { label: 'Resolved',    value: summary.Resolved || 0,          color: 'text-emerald-600'},
    { label: 'Critical',    value: summary.critical,               color: 'text-rose-600'  },
  ]

  return (
    <>
      {selected && (
        <DetailModal
          item={selected}
          onClose={() => setSelected(null)}
          onUpdate={updateStatus}
        />
      )}

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Admin</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">Complaint Dashboard</h1>
          </div>
          <button
            onClick={fetchAll}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map(({ label, value, color }) => (
            <div key={label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-widest text-slate-400">{label}</p>
              <p className={`mt-2 text-3xl font-semibold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Table card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 px-5 py-4">
            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search complaints..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    filter === s
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50">
                <tr>
                  {['Complaint ID', 'Category', 'Department', 'Severity', 'Status', 'Date', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-400">
                      <RefreshCw className="mx-auto mb-2 h-5 w-5 animate-spin text-slate-300" />
                      Loading complaints…
                    </td>
                  </tr>
                ) : paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-400">
                      No complaints match your filters.
                    </td>
                  </tr>
                ) : paginated.map((it) => (
                  <tr key={it.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs font-semibold text-slate-900">{it.complaint_id}</span>
                      {it.location && (
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                          <MapPin className="h-3 w-3" />{it.location.split(',')[0]}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">{it.category}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{it.department}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${severityStyle(it.severity)}`}>
                        {it.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyle(it.status)}`}>
                        {it.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {it.created_at
                        ? new Date(it.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })
                        : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelected(it)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                      >
                        <Eye className="h-3.5 w-3.5" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
            <p className="text-xs text-slate-400">
              {filtered.length === 0 ? '0 results' : `${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length}`}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .reduce((acc, p, i, arr) => {
                  if (i > 0 && p - arr[i - 1] > 1) acc.push('…')
                  acc.push(p)
                  return acc
                }, [])
                .map((p, i) =>
                  p === '…' ? (
                    <span key={`ellipsis-${i}`} className="px-1 text-xs text-slate-400">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`min-w-[28px] rounded-lg px-2 py-1 text-xs font-semibold transition ${
                        page === p ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
