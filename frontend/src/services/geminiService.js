// Optional Gemini frontend service — only used if VITE_GEMINI_API_KEY is set.
// The backend already handles Gemini via the /api/complaints/analyze endpoint.
// This service is a direct client-side fallback if needed.

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY
export const isGeminiAvailable = Boolean(GEMINI_KEY)

export async function analyzeWithGemini(imageFile, description = '', location = '') {
  if (!isGeminiAvailable) return null
  // Convert image to base64
  const base64 = await new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.readAsDataURL(imageFile)
  })
  const mime = imageFile.type || 'image/jpeg'
  const prompt = `You are JanSetu AI, a civic complaint analysis system for Indian cities.
Analyze the image and return ONLY valid JSON:
{
  "caption": "one sentence describing the image",
  "category": "one of: Pothole / Road Damage, Garbage Accumulation, Water Leakage / Sewage Overflow, Damaged Electric Wire / Power Outage, Fire / Smoke, Illegal Parking / Traffic Obstruction, Dead Animal on Road, Fallen Tree / Road Blockage, Broken Street Light, Open Drain / Manhole, General Civic Issue",
  "severity": "Low|Medium|High|Critical",
  "department": "real Indian government department name",
  "summary": "2-3 sentences: describe issue, public impact, urgency",
  "recommended_action": "one actionable instruction for the department"
}
Location: ${location || 'not specified'}
Description: ${description || 'none'}
Respond with JSON only.`

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ inline_data: { mime_type: mime, data: base64 } }, { text: prompt }] }],
      }),
    }
  )
  const data = await res.json()
  let raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
  raw = raw.replace(/```json|```/g, '').trim()
  return JSON.parse(raw)
}
