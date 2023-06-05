import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { LoginData } from '../pages/Login/schemas'


interface AuthProviderProps {
    children: ReactNode
}
interface AuthContextValues {
    signIn: (data: LoginData) => void
    loading: boolean
}

export const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const navigate = useNavigate()
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('contact-sync:token')
        if (!token) {
            return
        }
        api.defaults.headers.authorization = `Bearer ${token}`
        setLoading(false)
    }, [loading])

    const signIn = async (data: LoginData) => {
        try {
            const response = await api.post('/login', data)
            const { token } = await response.data
            api.defaults.headers.authorization = `Bearer ${token}`
            localStorage.setItem('contact-sync:token', token)
            setLoading(false)
            navigate('home')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, loading }}>
            { children }
        </AuthContext.Provider>
    )
}