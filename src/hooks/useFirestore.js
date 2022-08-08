import { useReducer, useEffect, useState } from 'react'
import { collection, addDoc, doc, updateDoc, Timestamp } from 'firebase/firestore'
import { db } from '../firebase/config'

const initialState = {
    isPending: false,
    document: null,
    success: false,  
    error: null
}

const firestoreReducer = (state, action) => {
    switch(action.type) {
        case 'PENDING':
            return { isPending: true, document: null, success: false, error: null }
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'UPDATED_DOCUMENT':
            return { isPending: false, document: null, success: true, error: null }
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state
    }
}

export const useFirestore = () => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    const dispatchIfNotCancelled = (data) => {
        if (!isCancelled) {
            dispatch(data)
        }
    }

    const addDocument = async (data) => {
        dispatchIfNotCancelled({ type: 'PENDING'})
        
        try {
            const collectionRef = collection(db, 'chatrooms')
            const addedDocument = await addDoc(collectionRef, data)
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    }

    const updateDocument = async (path, data) => {
        dispatchIfNotCancelled({ type: 'PENDING'})

        try {
            const docRef = doc(db, path)
            await updateDoc(docRef, data)
            dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT' })
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    }

    useEffect(() => {
        // return () => setIsCancelled(true)
    }, [])

    return { addDocument, updateDocument, response }
}