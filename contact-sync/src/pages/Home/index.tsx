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
                <div className='title-container'>
                    <h1>CONTATOS</h1>
                </div>
                <div className='contacts-container'>
                    <ul className='contacts-list'>

                    </ul>
                </div>
            </main>
        </>
    )
}

export default Home