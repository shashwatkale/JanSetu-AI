import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 25000,
})

const mockAnalysis = async (formData) => {
  return {
    caption: 'A damaged road with a large pothole and uneven pavement is visible.',
    category: 'Pothole / Road Damage',
    severity: 'Medium',
    department: 'Municipal Corporation / PWD',
    summary: 'A medium priority road damage complaint has been detected. Estimated repair response time is 48 hours.',
    recommended_action: 'Send repair crew to fill pothole within 48 hours.',
    image_path: 'mock-path.jpg',
  }
}

export async function analyzeComplaint(formData) {
  if (GEMINI_KEY) {
    try {
      // Optional Gemini integration placeholder
      // Actual Gemini implementation can be added here when key is configured
      const response = await axiosClient.post('/api/complaints/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return response.data
    } catch (error) {
      return mockAnalysis(formData)
    }
  }

  try {
    const response = await axiosClient.post('/api/complaints/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  } catch (error) {
    return mockAnalysis(formData)
  }
}

export async function submitComplaint(payload) {
  try {
    const response = await axiosClient.post('/api/complaints/submit', payload)
    return response.data
  } catch (error) {
    return { complaint_id: 'JS-000000-001', status: 'Submitted', message: 'Mock submission completed.' }
  }
}

export async function trackComplaint(complaintId) {
  // Mock tracking for demo purposes
  return {
    complaint_id: complaintId || 'JS-000000-001',
    status: 'In Progress',
    department: 'Municipal Corporation / PWD',
    issue: 'Pothole / Road Damage',
    location: 'MG Road, Indore',
    timeline: [
      { label: 'Submitted', state: 'completed' },
      { label: 'AI Verified', state: 'completed' },
      { label: 'Routed', state: 'completed' },
      { label: 'Acknowledged', state: 'active' },
      { label: 'In Progress', state: 'pending' },
      { label: 'Resolved', state: 'pending' },
    ],
  }
}
