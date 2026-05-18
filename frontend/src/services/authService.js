import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean)

let auth = null
let googleProvider = null

if (isFirebaseConfigured) {
  const app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  googleProvider = new GoogleAuthProvider()
  googleProvider.setCustomParameters({ prompt: 'select_account' })
}

export { auth, isFirebaseConfigured }

export async function signInWithGoogle() {
  if (!isFirebaseConfigured) throw new Error('Firebase not configured')
  const result = await signInWithPopup(auth, googleProvider)
  const user = result.user
  return {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    provider: 'google',
    createdAt: user.metadata.creationTime,
  }
}

export async function logout() {
  if (!isFirebaseConfigured) return
  await signOut(auth)
}

export function onAuthChange(callback) {
  if (!isFirebaseConfigured) {
    callback(null)
    return () => {}
  }
  return onAuthStateChanged(auth, (user) => {
    if (!user) { callback(null); return }
    callback({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      provider: 'google',
      createdAt: user.metadata.creationTime,
    })
  })
}

// Demo login for development when Firebase is not configured
export function demoLogin() {
  return {
    uid: 'demo-user-001',
    name: 'Demo Citizen',
    email: 'demo@jansetu.in',
    photoURL: null,
    provider: 'demo',
    createdAt: new Date().toISOString(),
  }
}
