import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import GoogleLoginButton from '../components/GoogleLoginButton'
import { ShieldCheck, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/new'

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-600 text-white shadow-lg shadow-emerald-500/30">
              <Sparkles className="h-8 w-8" />
            </div>
            <h1 className="mt-5 text-2xl font-semibold text-slate-900 dark:text-white">Sign in to JanSetu AI</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Report civic issues and track your complaints
            </p>
          </div>

          <div className="mt-8">
            <GoogleLoginButton onSuccess={() => navigate(from, { replace: true })} />
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
            <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your data is secure. We only use your name and email to identify your complaints.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
