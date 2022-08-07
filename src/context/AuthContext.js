import { useEffect, useReducer, createContext } from 'react'
import { auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        case 'AUTH_IS_READY':
            return { user: action.payload, isAuthReady: true }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isAuthReady: false
    })

    console.log(state)

    useEffect(() => {
        try {
            const unsub = onAuthStateChanged(auth, (user) => {
                dispatch({ type: 'AUTH_IS_READY', payload: user })
                unsub()
            })
        } catch (err) {
            console.log(err.message)
        }
    }, [])


    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}