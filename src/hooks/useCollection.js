import { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/config'

export const useCollection = (c) => {
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [documents, setDocuments] = useState(null)

    useEffect(() => {
        setIsPending(true)
        setError(null)

        const collectionRef = collection(db, c)
        const unsub = onSnapshot(collectionRef, (snapshot) => {
            let results = []
            snapshot.docs.forEach((doc) => {
                results.push({ ...doc.data(), id: doc.id })
            })
            
            // update states
            setIsPending(false)
            setError(null)
            setDocuments(results)
        }, (err) => {
            // update states
            setIsPending(false)
            setError(err.message)
            console.log(err.message)
        })

        // unsubscribe when unmount
        return () => unsub()
    }, [c])

    return { isPending, error, documents }
}