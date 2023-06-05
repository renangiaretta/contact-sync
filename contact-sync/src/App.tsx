import { AuthProvider } from './providers/AuthProvider'
import { RoutesMain } from './routes'
import './styles/GlobalStyles.sass'


function App() {


  return (
    <>
      <AuthProvider>
        <RoutesMain />
      </AuthProvider>
    </>
  )
}

export default App
