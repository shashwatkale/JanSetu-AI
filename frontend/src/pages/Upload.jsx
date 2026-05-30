import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { ImagePlus, Sparkles, ShieldCheck, Loader2, CheckCircle2, MapPin, Navigation } from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const ANALYZE_URL = `${API_BASE_URL}/api/complaints/analyze`
const SUBMIT_URL = `${API_BASE_URL}/api/complaints/submit`

export default function Upload() {
  const [file, setFile] = useState(null)
  const [desc, setDesc] = useState('')
  const [loc, setLoc] = useState('')
  const [locMode, setLocMode] = useState('auto')
  const [locLoading, setLocLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [locError, setLocError] = useState('')
  const suggestRef = useRef(null)
  const [userSeverity, setUserSeverity] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const SEVERITIES = ['Low', 'Medium', 'High', 'Severe', 'Critical']
  const SEVERITY_COLORS = {
    Low: 'bg-green-100 text-green-700 border-green-300',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    High: 'bg-orange-100 text-orange-700 border-orange-300',
    Severe: 'bg-red-100 text-red-700 border-red-300',
    Critical: 'bg-rose-200 text-rose-800 border-rose-400',
  }

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocError('Geolocation is not supported by your browser.')
      return
    }
    setLocError('')
    setLocLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { headers: { 'Accept-Language': 'en' } }
          )
          const data = await res.json()
          const addr = data.display_name || `${latitude}, ${longitude}`
          setLoc(addr)
        } catch {
          setLoc(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`)
        }
        setLocLoading(false)
      },
      (err) => {
        const msgs = {
          1: 'Location permission denied. Please allow location access in your browser settings.',
          2: 'Location unavailable. Try again or enter manually.',
          3: 'Location request timed out. Try again or enter manually.',
        }
        setLocError(msgs[err.code] || 'Unable to detect location. Please enter manually.')
        setLocLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

  const searchLocation = async (query) => {
    if (query.length < 3) { setSuggestions([]); return }
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=6&addressdetails=1`,
        { headers: { 'Accept-Language': 'en' } }
      )
      const data = await res.json()
      setSuggestions(data.map((d) => d.display_name))
      setShowSuggestions(true)
    } catch {
      setSuggestions([])
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => searchLocation(loc), 350)
    return () => clearTimeout(timer)
  }, [loc])

  useEffect(() => {
    const handler = (e) => {
      if (suggestRef.current && !suggestRef.current.contains(e.target))
        setShowSuggestions(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const analyze = async () => {
    if (!file) { setError('Please select an image first.'); return }
    if (!loc.trim()) { setError('Location is required. Please enter or auto-detect your location.'); return }
    if (!userSeverity) { setError('Please select the severity of the issue.'); return }
    setError('')
    setLoading(true)
    const fd = new FormData()
    fd.append('image', file)
    fd.append('description', desc)
    fd.append('location', loc)
    fd.append('user_severity', userSeverity)

    try {
      const res = await axios.post(ANALYZE_URL, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setResult(res.data)
    } catch (e) {
      setError('Analyze failed. Please try again or check your network connection.')
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
      alert(`Submitted: ${res.data.complaint_id}`)
      setResult(null)
      setFile(null)
      setDesc('')
      setLoc('')
      setLocMode('auto')
      setLocError('')
      setSuggestions([])
      setUserSeverity('')
    } catch (e) {
      setError('Submit failed. Please try again.')
    }
  }

  const previewUrl = file ? URL.createObjectURL(file) : null

  return (
    <div className="space-y-8">
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
          <p className="mt-6 max-w-2xl text-slate-600 dark:text-slate-400">Upload an image of road damage, garbage, water leaks, or any public hazard. JanSetu AI analyzes it instantly and recommends the correct department and priority.</p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Upload Image</label>
              <input
                className="input"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Location <span className="text-rose-500">*</span>
              </label>
              <div className="flex rounded-2xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => setLocMode('auto')}
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium transition-all ${
                    locMode === 'auto'
                      ? 'bg-white shadow text-emerald-700 dark:bg-slate-900 dark:text-emerald-400'
                      : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                  }`}
                >
                  <Navigation className="h-3.5 w-3.5" /> Auto-detect
                </button>
                <button
                  type="button"
                  onClick={() => setLocMode('manual')}
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium transition-all ${
                    locMode === 'manual'
                      ? 'bg-white shadow text-emerald-700 dark:bg-slate-900 dark:text-emerald-400'
                      : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                  }`}
                >
                  <MapPin className="h-3.5 w-3.5" /> Enter manually
                </button>
              </div>

              {locMode === 'auto' ? (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={detectLocation}
                    disabled={locLoading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 disabled:opacity-50 dark:border-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                  >
                    {locLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Navigation className="h-4 w-4" />}
                    {locLoading ? 'Detecting your location...' : 'Detect my current location'}
                  </button>
                  {locError && <p className="text-xs text-rose-600">{locError}</p>}
                  {loc && !locError && (
                    <p className="flex items-start gap-1.5 rounded-xl bg-emerald-50 px-3 py-2 text-xs text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />{loc}
                    </p>
                  )}
                </div>
              ) : (
                <div className="relative" ref={suggestRef}>
                  <input
                    className="input"
                    type="text"
                    placeholder="e.g. Nagpur, MG Road, Indore..."
                    value={loc}
                    onChange={(e) => { setLoc(e.target.value); setShowSuggestions(true) }}
                    onFocus={() => suggestions.length && setShowSuggestions(true)}
                    autoComplete="off"
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <ul className="absolute z-50 mt-1 w-full rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900 overflow-hidden">
                      {suggestions.map((s, i) => (
                        <li
                          key={i}
                          onMouseDown={() => { setLoc(s); setSuggestions([]); setShowSuggestions(false) }}
                          className="flex cursor-pointer items-start gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
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
          </div>

          <div className="mt-6 space-y-3">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
              How severe is this issue? <span className="text-rose-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {SEVERITIES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setUserSeverity(s)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                    userSeverity === s
                      ? SEVERITY_COLORS[s] + ' ring-2 ring-offset-1'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Notes (optional)</label>
            <textarea
              className="textarea"
              placeholder="Add any context or nearby landmarks"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="btn inline-flex items-center gap-2" onClick={analyze} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
              {loading ? 'Analyzing...' : 'Analyze Issue'}
            </button>
            {result && (
              <button className="btn-success inline-flex items-center gap-2" onClick={submit}>
                <CheckCircle2 className="h-4 w-4" />
                Confirm & Submit
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
              <li className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-950">Automatic department routing reduces delays.</li>
              <li className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-950">Severity tagging helps prioritize urgent issues.</li>
            </ul>
          </div>

          <div className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Quick workflow</p>
            <div className="mt-5 space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">1. Upload a photo</div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">2. Add location and notes</div>
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
              <h2 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Review the complaint before submission</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              <ShieldCheck className="h-4 w-4" /> AI verified routing
            </div>
          </div>

          <div className="mt-8 grid gap-5 xl:grid-cols-3">
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Detected issue</p>
              <p className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">{result.category}</p>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Priority</p>
              <p className="mt-3 text-xl font-semibold text-amber-600 dark:text-amber-300">{result.severity}</p>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Department</p>
              <p className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">{result.department}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Complaint summary</p>
              <p className="mt-3 text-slate-700 dark:text-slate-300">{result.summary}</p>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Recommended action</p>
              <p className="mt-3 text-slate-700 dark:text-slate-300">{result.recommended_action}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="btn inline-flex items-center gap-2" onClick={analyze} disabled={loading}>Retry analysis</button>
            <button className="btn-success inline-flex items-center gap-2" onClick={submit}>Submit complaint</button>
          </div>
        </section>
      )}
    </div>
  )
}
