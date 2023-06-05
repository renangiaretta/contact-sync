import Contacts from './components/Contacts'
import './styles.sass'


const Home = () => {

    return (
        <>
            <header className='header'>
                <div className='header-container'>
                    <div className='logo-container'>
                        <h1>LOGO</h1>
                    </div>
                    <div className='customer-interactions-container'>
                        <h2>PROFILE</h2>
                        <h2>CONTATOS</h2>
                        <h2>SAIR</h2>
                    </div>
                </div>
            </header>
            <main className='home-main'>
                <Contacts />
            </main>
        </>
    )
}

export default Home