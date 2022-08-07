import { useState, useEffect } from 'react'
import { auth, storage, db } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName, thumbnail) => {
        setError(null)
        setIsPending(true)

        try {
            // sign user up
            const res = await createUserWithEmailAndPassword(auth, email, password)

            if (!res) throw new Error('Unable to signup. Please retry..')

            // upload thumbnail
            const imgRef = ref(storage, `thumbnails/${res.user.uid}/${thumbnail.name}`)
            const img = await uploadBytes(imgRef, thumbnail)
            const photoURL = await getDownloadURL(imgRef)
            console.log(imgRef, img.ref)

            // add displayName and thumbnail to the user
            await updateProfile(res.user, { displayName, photoURL })

            // create a user document
            const docRef = doc(db, 'users', res.user.uid)
            await setDoc(docRef, {
                online: true,
                displayName,
                photoURL
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

    return { isPending, error, signup }
}