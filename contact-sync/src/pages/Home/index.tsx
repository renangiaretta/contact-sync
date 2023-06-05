import { useNavigate } from 'react-router-dom'
import Contacts from './components/Contacts'
import Profile from './components/Profile'
import './styles.sass'
import logo from './../../assets/img/contactsync-logo.png'

const Home = () => {
    const navigate = useNavigate()
    const exit = () => {
        localStorage.clear()
        navigate('/')
    }
    return (
        <>
            <header className='header'>
                <div className='header-container'>
                    <div className='logo-container'>
                        <img src={logo} alt="" />
                    </div>
                    <div className='customer-interactions-container'>
                        <button className='exit-button' onClick={exit}>SAIR</button>
                    </div>
                </div>
            </header>
            <main className='home-main'>
                <Profile />
                <Contacts />
            </main>
        </>
    )
}

export default Home