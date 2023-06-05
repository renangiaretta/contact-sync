import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import {
    Route,
    Routes
} from 'react-router-dom'
import { ProtectedRoutes } from './ProtectedRoutes'


export const RoutesMain = ( ) => {
    return(
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route element={<ProtectedRoutes /> } >
                <Route path='/home' element={<Home />} />
            </Route>
        </Routes>
    )
}