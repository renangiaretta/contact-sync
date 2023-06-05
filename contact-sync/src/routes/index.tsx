import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import {
    Route,
    Routes
} from 'react-router-dom'


export const RoutesMain = ( ) => {
    return(
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/register' element={<Register />} />
        </Routes>
    )
}