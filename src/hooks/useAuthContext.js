import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) return new Error('useAuthContext() can only be called inside AuthContext Provider')
    return context
}