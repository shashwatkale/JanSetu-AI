import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthChange } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined) // undefined = loading

  useEffect(() => {
    const stored = localStorage.getItem('jansetu_user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch { setUser(null) }
    }
    const unsub = onAuthChange((u) => {
      if (u) {
        setUser(u)
        localStorage.setItem('jansetu_user', JSON.stringify(u))
      } else if (!stored) {
        setUser(null)
      }
    })
    return unsub
  }, [])

  const setUserAndStore = (u) => {
    setUser(u)
    if (u) localStorage.setItem('jansetu_user', JSON.stringify(u))
    else localStorage.removeItem('jansetu_user')
  }

  return (
    <AuthContext.Provider value={{ user, setUser: setUserAndStore, loading: user === undefined }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
