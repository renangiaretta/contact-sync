import { LoginData, LoginSchema } from './schemas'
import './styles.sass'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../hooks/useAuth'


const Login = () => {

    const { register, handleSubmit } = useForm<LoginData>({
        resolver: zodResolver(LoginSchema)
    })
    const { signIn } = useAuth()

    return (
        <main className="main-container">
            <div className="left-container">
            </div>
            <div className="right-container">
                <form className="login-form-container" onSubmit={handleSubmit(signIn)}>
                    <div className="login-title-container">
                        <h1 className="login-title">REGISTRAR</h1>
                    </div>
                    <div className="login-input-container">
                        <label className="login-label" htmlFor="">E-mail</label>
                        <input className="login-input" type="text" placeholder='Digite seu e-mail' {...register('email')} />
                    </div>
                    <div className="login-input-container">
                        <label className="login-label" htmlFor="">Senha</label>
                        <input className="login-input" type="password" placeholder='Digite sua senha' {...register('password')} />
                    </div>
                    <div className="login-button-container">
                        <button className="login-button" type='submit'>Entrar</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Login