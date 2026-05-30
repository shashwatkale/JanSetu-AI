import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import {
  ImagePlus, Sparkles, ShieldCheck, Loader2, CheckCircle2,
  MapPin, Navigation, X, AlertTriangle, ArrowRight,
} from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const ANALYZE_URL  = `${API_BASE_URL}/api/complaints/analyze`
const SUBMIT_URL   = `${API_BASE_URL}/api/complaints/submit`

const SEVERITIES = ['Low', 'Medium', 'High', 'Severe', 'Critical']

const SEVERITY_PILL = {
  Low:      'bg-green-100  text-green-700  border-green-300',
  Medium:   'bg-yellow-100 text-yellow-700 border-yellow-300',
  High:     'bg-orange-100 text-orange-700 border-orange-300',
  Severe:   'bg-red-100    text-red-700    border-red-300',
  Critical: 'bg-rose-100   text-rose-800   border-rose-400',
}

const SEVERITY_TEXT = {
  Low:      'text-green-700',
  Medium:   'text-yellow-700',
  High:     'text-orange-600',
  Severe:   'text-red-600',
  Critical: 'text-rose-700',
}

export default function Upload() {
  // ── live form state — user can change these freely at any time ──
  const [file, setFile]                       = useState(null)
  const [desc, setDesc]                       = useState('')
  const [loc, setLoc]                         = useState('')
  const [locMode, setLocMode]                 = useState('auto')
  const [locLoading, setLocLoading]           = useState(false)
  const [suggestions, setSuggestions]         = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [locError, setLocError]               = useState('')
  const suggestRef                            = useRef(null)
  const [selectedSeverity, setSelectedSeverity] = useState('')

  // ── frozen snapshot — written ONLY when Analyze is clicked, never mutated by form ──
  // Shape: { category, severity, department, summary, recommended_action,
  //          caption, image_path, _snapshotDesc, _snapshotLoc }
  const [analysisResult, setAnalysisResult] = useState(null)

  // ── ui ──
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [submitted, setSubmitted] = useState(null)

  /* ─── location helpers ─── */
  const detectLocation = () => {
    if (!navigator.geolocation) { setLocError('Geolocation not supported.'); return }
    setLocError(''); setLocLoading(true)
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const r = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { headers: { 'Accept-Language': 'en' } }
          )
          const d = await r.json()
          setLoc(d.display_name || `${latitude}, ${longitude}`)
        } catch {
          setLoc(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`)
        }
        setLocLoading(false)
      },
      (err) => {
        const msgs = {
          1: 'Permission denied. Enter manually.',
          2: 'Location unavailable.',
          3: 'Request timed out.',
        }
        setLocError(msgs[err.code] || 'Unable to detect location.')
        setLocLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

  const searchLocation = async (query) => {
    if (query.length < 3) { setSuggestions([]); return }
    try {
      const r = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=6`,
        { headers: { 'Accept-Language': 'en' } }
      )
      const d = await r.json()
      setSuggestions(d.map((x) => x.display_name))
      setShowSuggestions(true)
    } catch { setSuggestions([]) }
  }

  useEffect(() => {
    const t = setTimeout(() => { if (locMode === 'manual') searchLocation(loc) }, 350)
    return () => clearTimeout(t)
  }, [loc, locMode])

  useEffect(() => {
    const h = (e) => {
      if (suggestRef.current && !suggestRef.current.contains(e.target))
        setShowSuggestions(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  /* ─── ANALYZE — captures snapshot of form at click time ─── */
  const handleAnalyze = async () => {
    if (!file)              { setError('Please select an image.'); return }
    if (!loc.trim())        { setError('Location is required.'); return }
    if (!selectedSeverity)  { setError('Please select a severity level.'); return }

    // Freeze current form values into local constants before any async work
    const frozenSeverity = selectedSeverity
    const frozenLoc      = loc
    const frozenDesc     = desc

    setError('')
    setLoading(true)
    setAnalysisResult(null) // clear previous result while loading

    const fd = new FormData()
    fd.append('image', file)
    fd.append('description', frozenDesc)
    fd.append('location', frozenLoc)
    fd.append('user_severity', frozenSeverity)

    try {
      const res = await axios.post(ANALYZE_URL, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      // Write snapshot once — severity is ALWAYS the frozen user value, never AI value
      setAnalysisResult({
        category:           res.data.category,
        severity:           frozenSeverity,       // ← frozen, not res.data.severity
        department:         res.data.department,
        summary:            res.data.summary,
        recommended_action: res.data.recommended_action,
        caption:            res.data.caption,
        image_path:         res.data.image_path,
        // store snapshot inputs so submit uses them, not live form state
        _snapshotDesc:      frozenDesc,
        _snapshotLoc:       frozenLoc,
      })
    } catch {
      setError('Analysis failed. Please try again.')
    }

    setLoading(false)
  }

  /* ─── SUBMIT — reads only from frozen snapshot, never from live form ─── */
  const handleSubmit = async () => {
    if (!analysisResult) return
    setError('')

    const payload = {
      user_id:            1,
      image_path:         analysisResult.image_path,
      description:        analysisResult._snapshotDesc,
      location:           analysisResult._snapshotLoc,
      caption:            analysisResult.caption,
      category:           analysisResult.category,
      severity:           analysisResult.severity,       // frozen severity
      department:         analysisResult.department,
      summary:            analysisResult.summary,
      recommended_action: analysisResult.recommended_action,
    }

    try {
      const res = await axios.post(SUBMIT_URL, payload)
      setSubmitted(res.data.complaint_id)
      // reset all state
      setAnalysisResult(null)
      setFile(null); setDesc(''); setLoc('')
      setLocMode('auto'); setLocError(''); setSuggestions([])
      setSelectedSeverity('')
    } catch {
      setError('Submit failed. Please try again.')
    }
  }

  const previewUrl = file ? URL.createObjectURL(file) : null

  /* ─── success screen ─── */
  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-7 w-7 text-emerald-600" />
          </div>
          <h2 className="mt-5 text-xl font-semibold text-slate-900">Complaint Submitted!</h2>
          <p className="mt-2 text-sm text-slate-500">
            Your complaint has been routed to the correct department.
          </p>
          <div className="mt-4 rounded-xl bg-white px-5 py-3 shadow-sm">
            <p className="text-xs text-slate-400">Complaint ID</p>
            <p className="mt-1 font-mono text-base font-bold text-emerald-700">{submitted}</p>
          </div>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button
              className="btn-success inline-flex items-center justify-center gap-2"
              onClick={() => setSubmitted(null)}
            >
              Report Another
            </button>
            <a href="/tracking" className="btn inline-flex items-center justify-center gap-2">
              Track Complaint <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Page header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">New Report</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">Report a civic issue</h1>
        <p className="mt-1 text-sm text-slate-500">
          Upload a photo — AI handles detection, severity, and routing.
        </p>
      </div>

      {/* ── Form card ── */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">

        {/* Step 1 — Image */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Photo <span className="text-rose-500">*</span>
          </label>
          {previewUrl ? (
            <div className="relative overflow-hidden rounded-xl border border-slate-200">
              <img src={previewUrl} alt="Preview" className="h-52 w-full object-cover" />
              <button
                onClick={() => { setFile(null); setAnalysisResult(null) }}
                className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-slate-600 shadow hover:bg-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-10 text-center transition hover:border-emerald-400 hover:bg-emerald-50/30">
              <ImagePlus className="h-8 w-8 text-slate-400" />
              <span className="text-sm font-medium text-slate-600">Click to upload or drag & drop</span>
              <span className="text-xs text-slate-400">JPG, PNG, WEBP up to 10 MB</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { setFile(e.target.files[0]); setAnalysisResult(null) }}
              />
            </label>
          )}
        </div>

        {/* Step 2 — Description */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Description <span className="font-normal text-slate-400">(optional — improves AI summary)</span>
          </label>
          <textarea
            className="textarea"
            placeholder="Describe the issue in your own words, e.g. 'Garbage has been piling up near SH6 for two weeks...'"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        {/* Step 3 — Location */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Location <span className="text-rose-500">*</span>
          </label>
          <div className="mb-2 flex rounded-xl border border-slate-200 bg-slate-50 p-1">
            {['auto', 'manual'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setLocMode(mode)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  locMode === mode
                    ? 'bg-white shadow text-emerald-700'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {mode === 'auto'
                  ? <><Navigation className="h-3.5 w-3.5" /> Auto-detect</>
                  : <><MapPin className="h-3.5 w-3.5" /> Enter manually</>}
              </button>
            ))}
          </div>

          {locMode === 'auto' ? (
            <div className="space-y-2">
              <button
                type="button"
                onClick={detectLocation}
                disabled={locLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 disabled:opacity-50"
              >
                {locLoading
                  ? <Loader2 className="h-4 w-4 animate-spin" />
                  : <Navigation className="h-4 w-4" />}
                {locLoading ? 'Detecting...' : 'Detect my location'}
              </button>
              {locError && <p className="text-xs text-rose-600">{locError}</p>}
              {loc && !locError && (
                <p className="flex items-start gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />{loc}
                </p>
              )}
            </div>
          ) : (
            <div className="relative" ref={suggestRef}>
              <input
                className="input"
                type="text"
                placeholder="e.g. MG Road, Indore..."
                value={loc}
                onChange={(e) => { setLoc(e.target.value); setShowSuggestions(true) }}
                onFocus={() => suggestions.length && setShowSuggestions(true)}
                autoComplete="off"
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      onMouseDown={() => { setLoc(s); setSuggestions([]); setShowSuggestions(false) }}
                      className="flex cursor-pointer items-start gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                      <span className="line-clamp-2">{s}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Step 4 — Severity */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Severity <span className="text-rose-500">*</span>
          </label>
          <p className="mb-2 text-xs text-slate-400">
            Your selection is locked into the analysis — AI will not override it.
          </p>
          <div className="flex flex-wrap gap-2">
            {SEVERITIES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSeverity(s)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                  selectedSeverity === s
                    ? SEVERITY_PILL[s] + ' ring-2 ring-offset-1'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600">
            <AlertTriangle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        {/* Step 5 — Analyze button only (no Submit here) */}
        <div className="pt-1">
          <button
            className="btn inline-flex items-center gap-2"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading
              ? <Loader2 className="h-4 w-4 animate-spin" />
              : <Sparkles className="h-4 w-4" />}
            {loading ? 'Analyzing...' : 'Analyze Issue'}
          </button>
        </div>
      </div>

      {/* ── AI Analysis Result — renders ONLY from frozen snapshot ──
           Changing selectedSeverity, desc, or loc after this renders
           has ZERO effect on what is displayed here. ── */}
      {analysisResult && (
        <div className="rounded-2xl border border-emerald-200 bg-white shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
                AI Analysis
              </p>
              <h2 className="mt-0.5 text-base font-semibold text-slate-900">
                Review before submitting
              </h2>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified
            </div>
          </div>

          <div className="p-6 space-y-4">
            {/* 3-column info row — all values from snapshot, never from live state */}
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-400">Issue Type</p>
                <p className="mt-1.5 text-sm font-semibold text-slate-900">
                  {analysisResult.category}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-400">Severity</p>
                {/* Reads analysisResult.severity — the frozen value, NOT selectedSeverity */}
                <p className={`mt-1.5 text-sm font-semibold ${SEVERITY_TEXT[analysisResult.severity] || 'text-slate-900'}`}>
                  {analysisResult.severity}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-400">Department</p>
                <p className="mt-1.5 text-sm font-semibold text-sky-700">
                  {analysisResult.department}
                </p>
              </div>
            </div>

            {/* Full-width Recommended Action */}
            {analysisResult.recommended_action && (
              <div className="rounded-xl border-l-4 border-emerald-500 bg-emerald-50 px-5 py-4">
                <div className="mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-emerald-600" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
                    Recommended Action
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-slate-700">
                  {analysisResult.recommended_action}
                </p>
              </div>
            )}

            {/* AI Summary */}
            {analysisResult.summary && (
              <div className="rounded-xl bg-slate-50 px-5 py-4">
                <p className="text-xs font-medium text-slate-400 mb-1.5">AI Summary</p>
                <p className="text-sm leading-relaxed text-slate-700">
                  {analysisResult.summary}
                </p>
              </div>
            )}

            {/* Actions — Re-analyze resets snapshot; Submit uses snapshot */}
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                className="btn inline-flex items-center gap-2"
                onClick={handleAnalyze}
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                Re-analyze
              </button>
              <button
                className="btn-success inline-flex items-center gap-2"
                onClick={handleSubmit}
              >
                <CheckCircle2 className="h-4 w-4" /> Submit Complaint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
