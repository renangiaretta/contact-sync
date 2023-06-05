import { useEffect, useState } from 'react'
import './styles.sass'
import { api } from '../../../../services/api'
import ReactModal from 'react-modal'
import { useForm } from 'react-hook-form'
import { UpdateProfileData, UpdateProfileSchema } from './schemas'
import { zodResolver } from '@hookform/resolvers/zod'


interface IProfileInfo {
    id: number
    first_name: string
    last_name: string
    email: string
    phone: string
    created_at: string
}

const Profile = () => {
    const [ profileInfo, setProfileInfo ] = useState<IProfileInfo | null>(null)
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const { register, handleSubmit } = useForm<UpdateProfileData>({
        resolver: zodResolver(UpdateProfileSchema)
    })

    async function updateProfile (data: UpdateProfileData) {
        try {
            await api.patch('/customers', data)
            setModalIsOpen(false)
        } catch (error) {
            console.error(error)
        }
    }

    const openModal = () => {
        setModalIsOpen(true);
        };
        
        const closeModal = () => {
            setModalIsOpen(false);
        };

    useEffect(() => {
        async function getProfileInfo () {
            try {
                const response = await api.get('/customers')
                setProfileInfo(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        getProfileInfo()
    }, [modalIsOpen])

    if (!profileInfo) {
        return <div>Carregando...</div>
    }

    return (
        <>
            <div className='home-profile'>
                <div className="profile-container">
                    <h1>Informaçõs do Perfil:</h1>
                    <h2>{profileInfo.first_name} {profileInfo.last_name}</h2>
                    <h2>{profileInfo.email}</h2>
                    <h2>{profileInfo.phone}</h2>
                    <button onClick={openModal} >Editar</button>
                </div>
            </div>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Exemplo de Modal"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <form onSubmit={handleSubmit(updateProfile)}>
                    <label htmlFor="">Nome</label>
                    <input type='text' placeholder={profileInfo.first_name} defaultValue={profileInfo.first_name} {...register('first_name')} />
                    <label htmlFor="">Sobrenome</label>
                    <input type='text' placeholder={profileInfo.last_name} defaultValue={profileInfo.last_name} {...register('last_name')} />
                    <label htmlFor="">E-mail</label>
                    <input type='text' placeholder={profileInfo.email} defaultValue={profileInfo.email} {...register('email')} />
                    <label htmlFor="">Telefone</label>
                    <input type='text' placeholder={profileInfo.phone} defaultValue={profileInfo.phone} {...register('phone')} />
                    <button onClick={closeModal}>Fechar</button>
                    <button type='submit'>Salvar</button>
                </form>
            </ReactModal>
        </>
    )
}

export default Profile