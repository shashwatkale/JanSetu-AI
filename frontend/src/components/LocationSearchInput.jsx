import React, { useState, useRef, useEffect } from 'react'
import { MapPin, Search, Loader2, X } from 'lucide-react'
import { searchLocations, resolveLocation, isGoogleMapsAvailable } from '../services/locationService'

export default function LocationSearchInput({ value, onChange, onSelect }) {
  const [query, setQuery] = useState(value || '')
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const [noResults, setNoResults] = useState(false)
  const debounceRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleInput = (e) => {
    const val = e.target.value
    setQuery(val)
    onChange?.(val)
    setNoResults(false)
    clearTimeout(debounceRef.current)
    if (val.trim().length < 2) { setSuggestions([]); setOpen(false); return }
    debounceRef.current = setTimeout(async () => {
      setSearching(true)
      try {
        const results = await searchLocations(val)
        setSuggestions(results)
        setNoResults(results.length === 0)
        setOpen(true)
      } catch { setSuggestions([]) }
      setSearching(false)
    }, 400)
  }

  const select = async (item) => {
    setQuery(item.short || item.label)
    onChange?.(item.short || item.label)
    setSuggestions([])
    setOpen(false)
    setNoResults(false)
    // Resolve lat/lon for Google Places items
    const resolved = await resolveLocation(item)
    onSelect?.(resolved)
  }

  const clear = () => {
    setQuery('')
    onChange?.('')
    onSelect?.(null)
    setSuggestions([])
    setOpen(false)
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-600" />
        <input
          className="input pl-10 pr-10"
          type="text"
          placeholder="Search area, street, colony, city..."
          value={query}
          onChange={handleInput}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          autoComplete="off"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2">
          {searching ? (
            <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
          ) : query ? (
            <button onClick={clear} className="text-slate-400 hover:text-slate-600"><X className="h-4 w-4" /></button>
          ) : (
            <Search className="h-4 w-4 text-slate-400" />
          )}
        </span>
      </div>

      {open && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
          <ul>
            {noResults ? (
              <li className="px-4 py-3 text-sm text-slate-500">No locations found. Try a different search.</li>
            ) : (
              suggestions.map((s, i) => (
                <li
                  key={i}
                  onMouseDown={() => select(s)}
                  className="flex cursor-pointer items-start gap-3 px-4 py-3 text-sm transition hover:bg-emerald-50 dark:hover:bg-slate-800"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <div className="min-w-0">
                    <p className="font-medium text-slate-800 dark:text-slate-200 truncate">{s.short}</p>
                    {s.state && <p className="text-xs text-slate-400">{s.state}</p>}
                  </div>
                </li>
              ))
            )}
          </ul>
          {/* Required attribution per Google Maps ToS */}
          {isGoogleMapsAvailable && (
            <div className="flex items-center justify-end border-t border-slate-100 px-3 py-1.5 dark:border-slate-800">
              <img
                src="https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3.png"
                alt="Powered by Google"
                className="h-4 opacity-70"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
