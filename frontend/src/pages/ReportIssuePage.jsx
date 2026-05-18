import React, { useState } from 'react'
import axios from 'axios'
import { Loader2, CheckCircle2, ShieldCheck, MapPin, AlertTriangle } from 'lucide-react'
import ImageUploadBox from '../components/ImageUploadBox'
import LocationSearchInput from '../components/LocationSearchInput'
import CurrentLocationButton from '../components/CurrentLocationButton'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const SEVERITY_STYLES = {
  Low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  High: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Critical: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
}

export default function ReportIssuePage() {
  const { user } = useAuth()
  const [file, setFile] = useState(null)
  const [loc, setLoc] = useState('')
  const [locData, setLocData] = useState(null)
  const [desc, setDesc] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [submitted, setSubmitted] = useState(null)

  const handleLocationSelect = (item) => {
    if (!item) { setLocData(null); return }
    setLoc(item.short || item.label)
    setLocData(item)
  }

  const handleCurrentLocation = (item) => {
    setLoc(item.short || item.formattedAddress || item.label)
    setLocData(item)
  }

  const analyze = async () => {
    if (!file) { toast.error('Please upload an image first'); return }
    setLoading(true)
    setResult(null)
    const fd = new FormData()
    fd.append('image', file)
    fd.append('description', desc)
    fd.append('location', loc)
    try {
      const res = await axios.post(`${API_BASE}/api/complaints/analyze`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setResult(res.data)
      toast.success('Analysis complete!')
    } catch (e) {
      toast.error('Analysis failed: ' + (e.response?.data?.detail || e.message))
    }
    setLoading(false)
  }

  const submit = async () => {
    if (!result) return
    const payload = {
      user_id: user?.uid || 1,
      image_path: result.image_path,
      description: desc,
      location: loc,
      caption: result.caption,
      category: result.category,
      severity: result.severity,
      department: result.department,
      summary: result.summary,
      recommended_action: result.recommended_action,
    }
    try {
      const res = await axios.post(`${API_BASE}/api/complaints/submit`, payload)
      setSubmitted(res.data.complaint_id)
      toast.success(`Complaint submitted! ID: ${res.data.complaint_id}`)
      setResult(null)
      setFile(null)
      setDesc('')
      setLoc('')
      setLocData(null)
    } catch {
      toast.error('Submission failed. Please try again.')
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-16">
      {/* Header */}
      <div className="flex items-center gap-4 rounded-[28px] border border-slate-200 bg-white px-6 py-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Report a Civic Issue</h1>
          <p className="text-sm text-slate-500">Upload a photo, add location, and let AI do the rest</p>
        </div>
        {user && (
          <div className="ml-auto hidden items-center gap-2 sm:flex">
            {user.photoURL ? (
              <img src={user.photoURL} className="h-8 w-8 rounded-full" alt={user.name} />
            ) : (
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                {user.name?.[0]?.toUpperCase()}
              </span>
            )}
            <span className="text-sm text-slate-600 dark:text-slate-400">{user.name}</span>
          </div>
        )}
      </div>

      {/* Success banner */}
      {submitted && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-800 dark:bg-emerald-900/20">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
            Complaint submitted! Your ID: <strong>{submitted}</strong>
          </p>
          <button onClick={() => setSubmitted(null)} className="ml-auto text-xs text-emerald-600 underline">Dismiss</button>
        </div>
      )}

      {/* Main form grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left — Image */}
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">Step 1 · Photo</p>
          <ImageUploadBox file={file} onChange={setFile} />
        </div>

        {/* Right — Location + Notes */}
        <div className="space-y-5">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">Step 2 · Location</p>
            <div className="space-y-3">
              <LocationSearchInput
                value={loc}
                onChange={setLoc}
                onSelect={handleLocationSelect}
              />
              <CurrentLocationButton onLocation={handleCurrentLocation} />
              {locData && (
                <div className="flex items-start gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm dark:bg-emerald-900/20">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <div>
                    <p className="font-medium text-emerald-800 dark:text-emerald-300">{locData.short || loc}</p>
                    {locData.state && <p className="text-xs text-emerald-600">{locData.state}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">Step 3 · Notes (optional)</p>
            <textarea
              className="textarea min-h-[100px]"
              placeholder="Describe the issue or add nearby landmarks..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <button
            onClick={analyze}
            disabled={loading || !file}
            className="btn flex w-full items-center justify-center gap-2 py-4 text-base"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
            {loading ? 'Analyzing with AI…' : 'Analyze Issue'}
          </button>
        </div>
      </div>

      {/* AI Result */}
      {result && (
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">AI Analysis Result</p>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${SEVERITY_STYLES[result.severity] || 'bg-slate-100 text-slate-700'}`}>
              {result.severity} Priority
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-xs text-slate-400 uppercase tracking-wider">Issue Type</p>
              <p className="mt-1 font-semibold text-slate-900 dark:text-white">{result.category}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-xs text-slate-400 uppercase tracking-wider">Responsible Department</p>
              <p className="mt-1 font-semibold text-slate-900 dark:text-white">{result.department}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">AI Caption</p>
            <p className="text-sm italic text-slate-600 dark:text-slate-300">"{result.caption}"</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Summary</p>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{result.summary}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Recommended Action</p>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{result.recommended_action}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button onClick={analyze} disabled={loading} className="btn-secondary flex items-center gap-2">
              Retry Analysis
            </button>
            <button onClick={submit} className="btn-success flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Submit Complaint
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
