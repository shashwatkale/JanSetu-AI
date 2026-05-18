import React, { useState } from 'react'
import { LocateFixed, Loader2 } from 'lucide-react'
import { getCurrentLocation, reverseGeocode } from '../services/locationService'
import toast from 'react-hot-toast'

export default function CurrentLocationButton({ onLocation }) {
  const [loading, setLoading] = useState(false)

  const handle = async () => {
    setLoading(true)
    try {
      const { lat, lon } = await getCurrentLocation()
      const result = await reverseGeocode(lat, lon)
      onLocation?.({ ...result, lat, lon })
      toast.success('Location fetched!')
    } catch (e) {
      toast.error(e.message)
    }
    setLoading(false)
  }

  return (
    <button
      type="button"
      onClick={handle}
      disabled={loading}
      className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-60 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LocateFixed className="h-4 w-4" />}
      {loading ? 'Fetching…' : 'Use Current Location'}
    </button>
  )
}
