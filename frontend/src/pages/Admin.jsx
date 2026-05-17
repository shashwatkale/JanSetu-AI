import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function Admin(){
  const [items,setItems]=useState([])

  useEffect(()=>{fetchAll()},[])
  const fetchAll = async ()=>{
    try{
      const res = await axios.get('http://localhost:8000/api/admin/complaints')
      setItems(res.data)
    }catch(e){console.error(e)}
  }

  const updateStatus = async (id, status)=>{
    try{
      await axios.put(`http://localhost:8000/api/admin/complaints/${id}/status`, {status, remarks:'', updated_by:'admin'})
      fetchAll()
    }catch(e){console.error(e)}
  }

  const summary = items.reduce((acc, complaint) => {
    acc.total += 1
    acc[complaint.status] = (acc[complaint.status] || 0) + 1
    return acc
  }, { total: 0 })

  const badgeClass = status => {
    if (status === 'Resolved') return 'bg-emerald-100 text-emerald-800'
    if (status === 'In Progress') return 'bg-sky-100 text-sky-800'
    if (status === 'Routed') return 'bg-amber-100 text-amber-800'
    if (status === 'Submitted') return 'bg-slate-100 text-slate-800'
    return 'bg-slate-100 text-slate-800'
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="card bg-gradient-to-br from-slate-900 to-indigo-700 text-white">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Total complaints</p>
          <h3 className="mt-4 text-3xl font-semibold">{summary.total}</h3>
        </div>
        <div className="card bg-white">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Submitted</p>
          <h3 className="mt-4 text-3xl font-semibold text-slate-900">{summary.Submitted || 0}</h3>
        </div>
        <div className="card bg-white">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">In Progress</p>
          <h3 className="mt-4 text-3xl font-semibold text-slate-900">{summary['In Progress'] || 0}</h3>
        </div>
        <div className="card bg-white">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Resolved</p>
          <h3 className="mt-4 text-3xl font-semibold text-slate-900">{summary.Resolved || 0}</h3>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Admin complaint feed</h2>
            <p className="mt-2 text-slate-600">Review incoming issues and update status quickly.</p>
          </div>
        </div>

        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm uppercase tracking-[0.15em] text-slate-500">
              <th className="px-4 py-3">Complaint</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Severity</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {items.map(it=> (
              <tr key={it.id}>
                <td className="px-4 py-4">
                  <div className="font-semibold text-slate-900">{it.complaint_id}</div>
                  <div className="text-sm text-slate-500">{it.location || 'No location'}</div>
                </td>
                <td className="px-4 py-4 text-slate-700">{it.category}</td>
                <td className="px-4 py-4 text-slate-700">{it.department}</td>
                <td className="px-4 py-4"><span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">{it.severity}</span></td>
                <td className="px-4 py-4"><span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${badgeClass(it.status)}`}>{it.status}</span></td>
                <td className="px-4 py-4 space-x-2">
                  <button className="px-3 py-1 rounded bg-slate-900 text-white text-sm" onClick={()=>updateStatus(it.id,'Routed')}>Routed</button>
                  <button className="px-3 py-1 rounded bg-sky-600 text-white text-sm" onClick={()=>updateStatus(it.id,'In Progress')}>In Progress</button>
                  <button className="px-3 py-1 rounded bg-emerald-600 text-white text-sm" onClick={()=>updateStatus(it.id,'Resolved')}>Resolved</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
