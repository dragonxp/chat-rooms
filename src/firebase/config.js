import { initializeApp } from 'firebase/app'
import { getFirestore, Timestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// TODO: Fill the firebase config first
const firebaseConfig = {
    
}

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()
const storage = getStorage()
const timestamp = Timestamp

export { db, auth, storage, timestamp }