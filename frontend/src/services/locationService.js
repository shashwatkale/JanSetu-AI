const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const NOMINATIM = 'https://nominatim.openstreetmap.org'

export const isGoogleMapsAvailable = Boolean(GOOGLE_KEY)

// ─── Google helpers ────────────────────────────────────────────────────────

async function googlePlacesSearch(query) {
  // Uses Places Autocomplete (New) — no SDK needed, just REST
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&components=country:in&language=en&key=${GOOGLE_KEY}`
  // Browser CORS blocks direct calls to Places API — use the JS API loader instead
  return googlePlacesSDK(query)
}

let googleSDKReady = false
let googleSDKPromise = null

function loadGoogleSDK() {
  if (googleSDKReady) return Promise.resolve()
  if (googleSDKPromise) return googleSDKPromise
  googleSDKPromise = new Promise((resolve, reject) => {
    if (window.google?.maps?.places) { googleSDKReady = true; resolve(); return }
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&libraries=places`
    script.async = true
    script.onload = () => { googleSDKReady = true; resolve() }
    script.onerror = reject
    document.head.appendChild(script)
  })
  return googleSDKPromise
}

async function googlePlacesSDK(query) {
  await loadGoogleSDK()
  return new Promise((resolve) => {
    const service = new window.google.maps.places.AutocompleteService()
    service.getPlacePredictions(
      { input: query, componentRestrictions: { country: 'in' }, language: 'en' },
      (predictions, status) => {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
          resolve([])
          return
        }
        resolve(predictions.map((p) => ({
          label: p.description,
          short: p.description,
          placeId: p.place_id,
          lat: null,
          lon: null,
          locality: p.terms?.[1]?.value || '',
          city: p.terms?.[1]?.value || '',
          state: p.terms?.[p.terms.length - 2]?.value || '',
          pincode: '',
          formattedAddress: p.description,
          _needsGeocode: true,
        })))
      }
    )
  })
}

async function googleGeocodePlace(placeId) {
  await loadGoogleSDK()
  return new Promise((resolve, reject) => {
    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ placeId }, (results, status) => {
      if (status !== 'OK' || !results?.[0]) { reject(new Error('Geocode failed')); return }
      const r = results[0]
      const get = (type) => r.address_components.find((c) => c.types.includes(type))?.long_name || ''
      resolve({
        label: r.formatted_address,
        short: r.formatted_address,
        lat: r.geometry.location.lat(),
        lon: r.geometry.location.lng(),
        locality: get('sublocality_level_1') || get('locality'),
        city: get('locality') || get('administrative_area_level_2'),
        state: get('administrative_area_level_1'),
        pincode: get('postal_code'),
        formattedAddress: r.formatted_address,
      })
    })
  })
}

async function googleReverseGeocode(lat, lon) {
  await loadGoogleSDK()
  return new Promise((resolve, reject) => {
    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ location: { lat, lng: lon } }, (results, status) => {
      if (status !== 'OK' || !results?.[0]) { reject(new Error('Reverse geocode failed')); return }
      const r = results[0]
      const get = (type) => r.address_components.find((c) => c.types.includes(type))?.long_name || ''
      const locality = get('sublocality_level_1') || get('sublocality') || get('neighborhood')
      const city = get('locality') || get('administrative_area_level_2')
      const state = get('administrative_area_level_1')
      const pincode = get('postal_code')
      const short = [locality, city, state].filter(Boolean).join(', ')
      resolve({
        label: r.formatted_address,
        short,
        lat,
        lon,
        locality,
        city,
        state,
        pincode,
        formattedAddress: r.formatted_address,
      })
    })
  })
}

// ─── Nominatim helpers ─────────────────────────────────────────────────────

function parseNominatimResult(item) {
  const a = item.address || {}
  const parts = [
    a.road || a.pedestrian || a.footway,
    a.neighbourhood || a.suburb || a.quarter,
    a.city || a.town || a.village || a.county,
    a.state,
  ].filter(Boolean)
  return {
    label: item.display_name,
    short: parts.join(', '),
    lat: parseFloat(item.lat),
    lon: parseFloat(item.lon),
    locality: a.neighbourhood || a.suburb || a.quarter || a.village || '',
    city: a.city || a.town || a.village || a.county || '',
    state: a.state || '',
    pincode: a.postcode || '',
    formattedAddress: item.display_name,
  }
}

async function nominatimSearch(query) {
  const params = new URLSearchParams({ q: query, format: 'json', addressdetails: 1, limit: 6, countrycodes: 'in' })
  const res = await fetch(`${NOMINATIM}/search?${params}`, {
    headers: { 'Accept-Language': 'en', 'User-Agent': 'JanSetuAI/1.0' },
  })
  const data = await res.json()
  return data.map(parseNominatimResult)
}

async function nominatimReverse(lat, lon) {
  const params = new URLSearchParams({ lat, lon, format: 'json', addressdetails: 1 })
  const res = await fetch(`${NOMINATIM}/reverse?${params}`, {
    headers: { 'Accept-Language': 'en', 'User-Agent': 'JanSetuAI/1.0' },
  })
  const data = await res.json()
  return parseNominatimResult(data)
}

// ─── Public API ────────────────────────────────────────────────────────────

export async function searchLocations(query) {
  if (!query || query.trim().length < 2) return []
  if (isGoogleMapsAvailable) {
    try { return await googlePlacesSDK(query) } catch { /* fall through */ }
  }
  return nominatimSearch(query)
}

export async function resolveLocation(item) {
  // Called when user selects a suggestion — fetches lat/lon if not yet resolved
  if (!item._needsGeocode) return item
  try {
    return await googleGeocodePlace(item.placeId)
  } catch {
    return item
  }
}

export async function reverseGeocode(lat, lon) {
  if (isGoogleMapsAvailable) {
    try { return await googleReverseGeocode(lat, lon) } catch { /* fall through */ }
  }
  return nominatimReverse(lat, lon)
}

export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => {
        if (err.code === 1) reject(new Error('Location access denied. Please allow location permission.'))
        else reject(new Error('Unable to fetch location. Please try again.'))
      },
      { timeout: 10000 }
    )
  })
}
