import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'

export const useDocument = (c, d) => {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [documents, setDocuments] = useState(null)

    useEffect(() => {
        setIsPending(true)
        setError(null)

        const docRef = doc(db, c, d)
        const unsub = onSnapshot(docRef, (doc) => {
            if (doc.data()) {
                setDocuments(doc.data())
                setIsPending(false)
                setError(null)
            } else setError('No Chat room found with that id')
        }, (err) => {
            console.log(err.message)
            setIsPending(false)
            setError(err.message)
        })

        return () => unsub()
    }, [c, d])

    return { isPending, error, documents }
}