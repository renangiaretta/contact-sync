import { LoginData, LoginSchema } from './schemas'
import './styles.sass'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import contactSync from './../../assets/img/contact-sync.png'


const Login = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
        resolver: zodResolver(LoginSchema)
    })
    const { signIn } = useAuth()
    const toRegister = () => {
        navigate('/register')
    }
    return (
        <main className='main-container'>
            <div className='left-container'>
                <img src={contactSync} alt="" />
            </div>
            <div className='right-container'>
                <form className='login-form-container' onSubmit={handleSubmit(signIn)}>
                    <div className='login-title-container'>
                        <h1 className='login-title'>Entrar</h1>
                    </div>
                    <div className='login-input-container'>
                        <label className='login-label' htmlFor=''>E-mail</label>
                        <input className='login-input' type='text' placeholder='Digite seu e-mail' {...register('email')} />
                        {errors.email && <span className='error-messages'>{errors.email.message}</span>}
                    </div>
                    <div className='login-input-container'>
                        <label className='login-label' htmlFor=''>Senha</label>
                        <input className='login-input' type='password' placeholder='Digite sua senha' {...register('password')} />
                        {errors.password && <span className='error-messages'>{errors.password.message}</span>}
                    </div>
                    <div className='login-button-container'>
                        <button className='login-button' type='submit'>Entrar</button>
                    </div>
                    <div className='login-texts-container'>
                        <h4>Ainda não possui uma conta?</h4>
                        <button className='toregister-button' onClick={toRegister}>Registrar</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Login