import { useState, useEffect } from 'react'
import { db, auth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { doc, updateDoc } from 'firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try {
            // log user in
            const res = await signInWithEmailAndPassword(auth, email, password)

            // update online status
            const docRef = doc(db, 'users', res.user.uid)
            await updateDoc(docRef, {
                online: true
            })

            // dispatch login event
            dispatch({ type: 'LOGIN', payload: res.user })

            // if (!isCancelled) {
            //     setIsPending(false)
            //     setError(null)
            // }
            setIsPending(false)
            setError(null)

        } catch (err) {
            // if (!isCancelled) {
            //     setError(err.message)
            //     setIsPending(false)
            //     console.log(err.message)
            // }
            setError(err.message)
            setIsPending(false)
            console.log(err.message)
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { error, isPending, login }
}