import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { ImagePlus, Sparkles, ShieldCheck, Loader2, CheckCircle2, MapPin, Search } from 'lucide-react'
import { searchLocation } from '../services/locationService'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const ANALYZE_URL = `${API_BASE_URL}/api/complaints/analyze`
const SUBMIT_URL = `${API_BASE_URL}/api/complaints/submit`

function LocationSearch({ value, onChange }) {
  const [query, setQuery] = useState(value || '')
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const debounce = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleInput = (e) => {
    const val = e.target.value
    setQuery(val)
    onChange(val)
    clearTimeout(debounce.current)
    if (val.length < 3) { setSuggestions([]); setOpen(false); return }
    debounce.current = setTimeout(async () => {
      setSearching(true)
      try {
        const results = await searchLocation(val)
        setSuggestions(results)
        setOpen(results.length > 0)
      } catch { setSuggestions([]) }
      setSearching(false)
    }, 400)
  }

  const select = (item) => {
    setQuery(item.short || item.label)
    onChange(item.short || item.label)
    setSuggestions([])
    setOpen(false)
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          className="input pr-10"
          type="text"
          placeholder="Search locality, area, city..."
          value={query}
          onChange={handleInput}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          autoComplete="off"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </span>
      </div>
      {open && (
        <ul className="absolute z-50 mt-1 w-full rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900 overflow-hidden">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="flex cursor-pointer items-start gap-2 px-4 py-3 text-sm hover:bg-emerald-50 dark:hover:bg-slate-800"
              onMouseDown={() => select(s)}
            >
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span className="text-slate-700 dark:text-slate-300 line-clamp-2">{s.short || s.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Upload() {
  const [file, setFile] = useState(null)
  const [desc, setDesc] = useState('')
  const [loc, setLoc] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(null)

  const analyze = async () => {
    if (!file) { setError('Please select an image first.'); return }
    setError('')
    setLoading(true)
    setResult(null)
    const fd = new FormData()
    fd.append('image', file)
    fd.append('description', desc)
    fd.append('location', loc)
    try {
      const res = await axios.post(ANALYZE_URL, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      setResult(res.data)
    } catch (e) {
      setError('Analysis failed: ' + (e.response?.data?.detail || e.message))
    }
    setLoading(false)
  }

  const submit = async () => {
    if (!result) return
    setError('')
    const payload = {
      user_id: 1,
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
      const res = await axios.post(SUBMIT_URL, payload)
      setSubmitted(res.data.complaint_id)
      setResult(null)
      setFile(null)
      setDesc('')
      setLoc('')
    } catch (e) {
      setError('Submit failed. Please try again.')
    }
  }

  const severityColor = {
    Low: 'text-green-600 dark:text-green-400',
    Medium: 'text-amber-600 dark:text-amber-300',
    High: 'text-orange-600 dark:text-orange-400',
    Critical: 'text-rose-600 dark:text-rose-400',
  }

  const previewUrl = file ? URL.createObjectURL(file) : null

  return (
    <div className="space-y-8">
      {submitted && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 px-6 py-4 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-700 dark:text-emerald-300 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          Complaint submitted successfully! ID: <strong>{submitted}</strong>
          <button className="ml-auto text-sm underline" onClick={() => setSubmitted(null)}>Dismiss</button>
        </div>
      )}

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/30 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Smart upload</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">Report a civic issue with one photo.</h1>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-slate-600 dark:text-slate-400">Upload an image of road damage, garbage, water leaks, or any public hazard. JanSetu AI analyzes it instantly and routes it to the correct Indian government department.</p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Upload Image</label>
              <input className="input" type="file" accept="image/*" onChange={(e) => { setFile(e.target.files[0]); setResult(null) }} />
              {previewUrl && <img src={previewUrl} alt="preview" className="mt-2 h-32 w-full rounded-2xl object-cover" />}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Location</label>
              <LocationSearch value={loc} onChange={setLoc} />
              <p className="text-xs text-slate-400">Search by area, street, or city in India</p>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Notes</label>
            <textarea className="textarea" placeholder="Add any context or nearby landmarks" value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="btn inline-flex items-center gap-2" onClick={analyze} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
              {loading ? 'Analyzing...' : 'Analyze Issue'}
            </button>
            {result && (
              <button className="btn-success inline-flex items-center gap-2" onClick={submit}>
                <CheckCircle2 className="h-4 w-4" /> Confirm & Submit
              </button>
            )}
          </div>

          {error && <p className="mt-4 text-sm text-rose-600">{error}</p>}
        </div>

        <aside className="space-y-6">
          <div className="rounded-[36px] border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-emerald-600/10 text-emerald-700 dark:bg-emerald-500/10">💡</span>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">How it helps</p>
                <h2 className="mt-2 text-xl font-semibold">Faster response for every citizen report</h2>
              </div>
            </div>
            <ul className="mt-6 space-y-4 text-slate-600 dark:text-slate-400">
              <li className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-950">AI captioning removes manual complaint writing.</li>
              <li className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-950">Routes to real Indian government departments automatically.</li>
              <li className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-950">Severity tagging helps prioritize urgent issues.</li>
            </ul>
          </div>

          <div className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Quick workflow</p>
            <div className="mt-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">1. Upload a photo</div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">2. Search and select your location</div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">3. Review AI summary</div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">4. Submit and track progress</div>
            </div>
          </div>
        </aside>
      </section>

      {result && (
        <section className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Analysis Result</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Review before submission</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              <ShieldCheck className="h-4 w-4" /> AI verified routing
            </div>
          </div>

          <div className="mt-8 grid gap-5 xl:grid-cols-3">
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Detected Issue</p>
              <p className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">{result.category}</p>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Priority</p>
              <p className={`mt-3 text-xl font-semibold ${severityColor[result.severity] || 'text-slate-700'}`}>{result.severity}</p>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Responsible Department</p>
              <p className="mt-3 text-base font-semibold text-slate-950 dark:text-white">{result.department}</p>
            </div>
          </div>

          <div className="mt-5 rounded-[32px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">AI Caption</p>
            <p className="mt-3 text-slate-700 dark:text-slate-300 italic">"{result.caption}"</p>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Complaint Summary</p>
              <p className="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">{result.summary}</p>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Recommended Action</p>
              <p className="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">{result.recommended_action}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="btn inline-flex items-center gap-2" onClick={analyze} disabled={loading}>Retry Analysis</button>
            <button className="btn-success inline-flex items-center gap-2" onClick={submit}>
              <CheckCircle2 className="h-4 w-4" /> Submit Complaint
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
