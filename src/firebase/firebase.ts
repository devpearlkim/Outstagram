import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  Auth,
} from 'firebase/auth'
import { Firestore, getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

interface FirebaseConfig {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
}

const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
}

const app = initializeApp(firebaseConfig)
const auth: Auth = getAuth()
const provider = new GoogleAuthProvider()
const firestore: Firestore = getFirestore(app)
const storage = getStorage(app)

// Google Login
export async function googleLogin() {
  signInWithPopup(auth, provider).catch(console.error)
}

export async function resetPassword(email: string) {
  sendPasswordResetEmail(auth, email).catch(console.error)
}

export { firestore, auth, provider, storage }
