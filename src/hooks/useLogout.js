import { useState, useEffect } from 'react'
import { db, auth } from '../firebase/config'
import { doc, updateDoc } from 'firebase/firestore'
import { useAuthContext } from './useAuthContext'
import { signOut } from 'firebase/auth'

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const { dispatch, user } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        try {
            // update online status
            const docRef = doc(db, 'users', user.uid)
            await updateDoc(docRef, {
                online: false
            })

            // log user out
            await signOut(auth)

            // dispatch logout event
            dispatch({ type: 'LOGOUT' })

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

    return { error, isPending, logout }
}