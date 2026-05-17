import React, {useState} from 'react'
import axios from 'axios'

export default function Upload(){
  const [file,setFile]=useState(null)
  const [desc,setDesc]=useState('')
  const [loc,setLoc]=useState('')
  const [loading,setLoading]=useState(false)
  const [result,setResult]=useState(null)

  const analyze = async ()=>{
    if(!file) return alert('Select image')
    setLoading(true)
    const fd = new FormData()
    fd.append('image', file)
    fd.append('description', desc)
    fd.append('location', loc)
    try{
      const res = await axios.post('http://localhost:8000/api/complaints/analyze', fd, { headers: {'Content-Type':'multipart/form-data'} })
      setResult(res.data)
    }catch(e){
      alert('Analyze failed')
    }
    setLoading(false)
  }

  const submit = async ()=>{
    if(!result) return
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
    try{
      const res = await axios.post('http://localhost:8000/api/complaints/submit', payload)
      alert(`Submitted: ${res.data.complaint_id}`)
    }catch(e){
      alert('Submit failed')
    }
  }

  const previewUrl = file ? URL.createObjectURL(file) : null

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.75fr]">
      <section className="card space-y-6">
        <div>
          <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">New Complaint</span>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">Upload an issue image and let AI analyze it</h2>
          <p className="mt-3 text-slate-600">Capture potholes, garbage, leaks, fire hazards, or fallen trees. The system will suggest category, severity, and department routing.</p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Upload Image</label>
          <input className="block w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-700" type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} />
          {previewUrl && (
            <div className="rounded-[28px] overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
              <img src={previewUrl} alt="Preview" className="w-full h-72 object-cover" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea className="textarea" placeholder="Describe the issue" value={desc} onChange={e=>setDesc(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Location</label>
          <input className="input" placeholder="e.g. MG Road, Indore" value={loc} onChange={e=>setLoc(e.target.value)} />
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="btn" onClick={analyze} disabled={loading}>{loading ? 'Analyzing...' : 'Analyze Complaint'}</button>
          {result && <button className="btn btn-success" onClick={submit}>Confirm & Submit</button>}
        </div>
      </section>

      <aside className="space-y-5">
        <div className="card bg-gradient-to-br from-indigo-900 to-slate-900 text-white shadow-xl shadow-indigo-200/10">
          <h3 className="text-xl font-semibold">Why JanSetu AI?</h3>
          <p className="mt-3 text-slate-200">Smart triage for civic complaints, helping officials respond faster with clear issue details.</p>
          <div className="mt-5 space-y-3 text-sm leading-7">
            <p>• AI-powered captioning and classification</p>
            <p>• Department routing for faster action</p>
            <p>• Severity detection for urgent issues</p>
            <p>• Clean citizen complaint flow</p>
          </div>
        </div>
        <div className="card border border-slate-200 bg-slate-50">
          <h3 className="text-lg font-semibold text-slate-900">Quick steps</h3>
          <ol className="mt-4 space-y-3 text-slate-600">
            <li>1. Upload the issue image</li>
            <li>2. Add location and notes</li>
            <li>3. Analyze and review summary</li>
            <li>4. Submit and track later</li>
          </ol>
        </div>
      </aside>

      {result && (
        <section className="card lg:col-span-2">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900">AI Analysis Result</h3>
              <p className="mt-1 text-slate-600">Verify the report summary before submission.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800">Department: {result.department}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800">Severity: {result.severity}</span>
            </div>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h4 className="font-semibold text-slate-900">Caption</h4>
              <p className="mt-3 text-slate-700">{result.caption}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h4 className="font-semibold text-slate-900">Category</h4>
              <p className="mt-3 text-slate-700">{result.category}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h4 className="font-semibold text-slate-900">Action</h4>
              <p className="mt-3 text-slate-700">{result.recommended_action}</p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <h4 className="font-semibold text-slate-900">Complaint Summary</h4>
            <p className="mt-3 text-slate-700">{result.summary}</p>
          </div>
        </section>
      )}
    </div>
  )
}
