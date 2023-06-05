import { useForm } from 'react-hook-form'
import './styles.sass'
import { RegisterData, registerSchema } from './schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../../services/api'


const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema)
    })

    const registerCustomer = async (data: RegisterData) => {
        try {
            const response = await api.post('customers/', data)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <main className='main-container'>
            <div className='left-container'>
                <form className='register-form-container' onSubmit={handleSubmit(registerCustomer)}>
                    <div className='register-title-container'>
                        <h1 className='register-title'>REGISTRAR</h1>
                    </div>
                    <div className='register-input-container'>
                        <label className='register-label' htmlFor=''>E-mail</label>
                        <input className='register-input' type='text' placeholder='Digite seu e-mail' {...register('email')} />
                        {errors.email && <span className='error-message'>{errors.email.message}</span>}
                    </div>
                    <div className='register-input-container'>
                        <label className='register-label' htmlFor=''>Senha</label>
                        <input className='register-input' type='password' placeholder='Digite sua senha' {...register('password')} />
                        {errors.password && <span className='error-message'>{errors.password.message}</span>}
                    </div>
                    <div className='register-input-container'>
                        <label className='register-label' htmlFor=''>Nome</label>
                        <input className='register-input' type='text' placeholder='Digite seu nome'{...register('first_name')} />
                        {errors.first_name && <span className='error-message'>{errors.first_name.message}</span>}
                    </div>
                    <div className='register-input-container'>
                        <label className='register-label' htmlFor=''>Sobrenome</label>
                        <input className='register-input' type='text' placeholder='Digite seu sobrenome' {...register('last_name')} />
                        {errors.last_name && <span className='error-message'>{errors.last_name.message}</span>}
                    </div>
                    <div className='register-input-container'>
                        <label className='register-label' htmlFor=''>Telefone</label>
                        <input className='register-input' type='text' placeholder='Digite seu telefone' {...register('phone')} />
                        {errors.phone && <span className='error-message'>{errors.phone.message}</span>}
                    </div>
                    <div className='register-button-container'>
                        <button className='register-button' type='submit'>CADASTRAR</button>
                    </div>
                </form>
            </div>
            <div className='right-container'>

            </div>
        </main>
    )
}

export default Register