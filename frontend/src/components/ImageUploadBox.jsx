import React, { useRef, useState } from 'react'
import { ImagePlus, X, Upload } from 'lucide-react'
import toast from 'react-hot-toast'

const ALLOWED = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_MB = 5

export default function ImageUploadBox({ file, onChange }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const validate = (f) => {
    if (!ALLOWED.includes(f.type)) { toast.error('Only JPG, PNG, WEBP allowed'); return false }
    if (f.size > MAX_MB * 1024 * 1024) { toast.error(`Image must be under ${MAX_MB}MB`); return false }
    return true
  }

  const handleFile = (f) => { if (f && validate(f)) onChange(f) }

  const onDrop = (e) => {
    e.preventDefault(); setDragging(false)
    const f = e.dataTransfer.files?.[0]
    if (f) handleFile(f)
  }

  const previewUrl = file ? URL.createObjectURL(file) : null

  return (
    <div>
      {file ? (
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-700">
          <img src={previewUrl} alt="preview" className="h-56 w-full object-cover" />
          <button
            onClick={() => onChange(null)}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md transition hover:bg-rose-50 hover:text-rose-600 dark:bg-slate-900/90"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
            {file.name}
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex h-56 cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed transition ${
            dragging
              ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/10'
              : 'border-slate-300 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50/50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-600'
          }`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30">
            <Upload className="h-6 w-6" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {dragging ? 'Drop image here' : 'Drag & drop or click to upload'}
            </p>
            <p className="mt-1 text-xs text-slate-400">JPG, PNG, WEBP · Max 5MB</p>
          </div>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  )
}
