import { zodResolver } from '@hookform/resolvers/zod'
import './styles.sass'
import ReactModal from 'react-modal'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { UpdateContactData, UpdateContactSchema } from './schemas'
import { MdOutlineContactPhone } from 'react-icons/md'
import { AiOutlineMail } from 'react-icons/ai'
import { AiTwotonePhone } from 'react-icons/ai'


export interface IContact {
    id: number
    first_name: string
    last_name: string
    email: string
    phone: string
    }

    export interface IContactCardProps {
    contact: IContact
    handleContactUpdate: (updatedContact: IContact) => Promise<void>
    onDelete: () => Promise<void>
    }

    const ContactCard: React.FC<IContactCardProps> = ({ contact, handleContactUpdate, onDelete }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const { register, handleSubmit } = useForm<UpdateContactData>({
        resolver: zodResolver(UpdateContactSchema)
    })

    const updateContact = async (data: UpdateContactData) => {
        try {
        const updatedContact = { ...contact, ...data }
        await handleContactUpdate(updatedContact)
        setModalIsOpen(false)
        } catch (error) {
        console.error(error)
        }
    }

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    const handleDelete = async () => {
        try {
        await onDelete()
        } catch (error) {
        console.error(error)
        }
    }

    return (
        <>
            <li className='contact-card-container'>
                <div>
                <h2 className='contact-texts'><MdOutlineContactPhone/> {contact.first_name} {contact.last_name}</h2>
                </div>
                <div>
                <h2 className='contact-texts'><AiOutlineMail/> {contact.email}</h2>
                </div>
                <div>
                <h2 className='contact-texts'><AiTwotonePhone/> {contact.phone}</h2>
                </div>
                <div className='buttons-container'>
                    <button onClick={openModal}>editar</button>
                    <button onClick={handleDelete}>deletar</button>
                </div>
            </li>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Update contact modal'
                className='modal-content'
                overlayClassName='modal-overlay'
            >
                <form onSubmit={handleSubmit(updateContact)}>
                <div className='modal-input-container'>
                    <label htmlFor=''>Nome</label>
                    <input type='text' placeholder={contact.first_name} defaultValue={contact.first_name} {...register('first_name')} />
                </div>
                <div className='modal-input-container'>
                    <label htmlFor=''>Sobrenome</label>
                    <input type='text' placeholder={contact.last_name} defaultValue={contact.last_name} {...register('last_name')} />
                </div>
                <div className='modal-input-container'>
                    <label htmlFor=''>E-mail</label>
                    <input type='text' placeholder={contact.email} defaultValue={contact.email} {...register('email')} />
                </div>
                <div className='modal-input-container'>
                    <label htmlFor=''>Telefone</label>
                    <input type='text' placeholder={contact.phone} defaultValue={contact.phone} {...register('phone')} />
                </div>
                <div className='modal-buttons-container'>
                    <button onClick={closeModal}>Fechar</button>
                    <button type='submit'>Salvar</button>
                </div>
                </form>
            </ReactModal>
        </>
    )
}


export default ContactCard
