import { ReactNode, createContext } from 'react'
import { RegisterData } from '../pages/Register/schemas'
import { api } from '../services/api'


interface AuthProviderProps {
    children: ReactNode
}
interface AuthContextValues {
    registerCustomer: (data: RegisterData) => void
}

export const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const registerCustomer = async (data: RegisterData) => {
        try {
            const response = api.post('/customers', data)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <AuthContext.Provider value={{ registerCustomer }}>
            { children }
        </AuthContext.Provider>
    )
}