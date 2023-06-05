import { useAuth } from '../hooks/useAuth'
import { Outlet } from 'react-router-dom'


export const ProtectedRoutes = () => {
    const { loading } = useAuth()

    if (loading) {
        return <div>Carregando...</div>
    }
    return <Outlet />
}