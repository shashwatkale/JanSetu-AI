import React, {useEffect, useState} from 'react'
import axios from 'axios'

const statusStyle = status => {
  if (status === 'Resolved') return 'bg-emerald-100 text-emerald-800'
  if (status === 'In Progress') return 'bg-sky-100 text-sky-800'
  if (status === 'Submitted') return 'bg-slate-100 text-slate-800'
  if (status === 'Routed') return 'bg-amber-100 text-amber-800'
  return 'bg-slate-100 text-slate-800'
}

export default function Tracking(){
  const [items,setItems]=useState([])

  useEffect(()=>{fetchUser()},[])
  const fetchUser = async ()=>{
    try{
      const res = await axios.get('http://localhost:8000/api/complaints/user/1')
      setItems(res.data)
    }catch(e){console.error(e)}
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">My Complaints</h2>
          <p className="mt-2 text-slate-600 max-w-2xl">Track complaints you filed and see routing, severity, and status in one place.</p>
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        {items.length === 0 ? (
          <div className="card text-slate-600">No complaints found yet. File a new complaint from the home page.</div>
        ) : items.map(it=> (
          <div key={it.id} className="card hover:-translate-y-1 transition-transform">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold text-slate-900">{it.complaint_id}</h3>
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusStyle(it.status)}`}>{it.status}</span>
                </div>
                <p className="text-slate-600">{it.category} • {it.severity}</p>
                <p className="text-slate-700">{it.summary}</p>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 min-w-[180px]">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Department</p>
                <p className="mt-2 font-semibold text-slate-900">{it.department}</p>
                <p className="mt-4 text-sm uppercase tracking-[0.2em] text-slate-500">Location</p>
                <p className="mt-2 text-slate-700">{it.location || 'Not specified'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
