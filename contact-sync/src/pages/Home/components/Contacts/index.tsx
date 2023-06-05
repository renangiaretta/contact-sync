import { useEffect, useState } from 'react'
import { api } from '../../../../services/api'
import ContactCard, { IContact } from '../ContactCard/index'
import ReactModal from 'react-modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddContactData, AddContactSchema } from './schemas'
import { useForm } from 'react-hook-form'


interface IContactInfo {
    first_name: string
    last_name: string
    email: string
    phone: string
}

const Contacts: React.FC = () => {
    const [ contacts, setContacts ] = useState<IContact[]>([])
    const [ modalIsOpen, setModalIsOpen ] = useState(false)

    const { register, handleSubmit } = useForm<AddContactData>({
        resolver: zodResolver(AddContactSchema)
    })
    async function getContacts() {
    try {
        const response = await api.get('contacts')
        setContacts(response.data)
    } catch (error) {
        console.error(error)
    }
    }
    useEffect(() => {
        getContacts()
    }, [])

    const handleAddContact = async (data: IContactInfo) => {
        try {
            await api.post('/contacts', data)
            setModalIsOpen(false)
            await getContacts()
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


    const handleContactUpdate = async (updatedContact: IContact) => {
        try {
        await api.patch(`contacts/${updatedContact.id}`, updatedContact)
        setContacts((prevContacts) => {
            return prevContacts.map((contact) => {
            if (contact.id === updatedContact.id) {
                return updatedContact
            }
            return contact
            })
        })
        } catch (error) {
        console.error(error)
        }
    }

    const handleContactDelete = async (contactId: number) => {
        try {
        await api.delete(`contacts/${contactId}`)
        setContacts((prevContacts) => {
            return prevContacts.filter((contact) => contact.id !== contactId)
        })
        } catch (error) {
        console.error(error)
        }
    }

    if (!contacts) {
        return <div>Carregando...</div>
    }

    return (
        <>
            <div className='contacts-container'>
                <button onClick={openModal}>Adicionar Contato</button>
                <ul className='contacts-list'>
                {contacts.map((contact: IContact) => (
                    <ContactCard
                    key={contact.id}
                    contact={contact}
                    handleContactUpdate={handleContactUpdate}
                    onDelete={() => handleContactDelete(contact.id)}
                    />
                ))}
                </ul>
            </div>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Update contact modal'
                className='modal-content'
                overlayClassName='modal-overlay'
            >
                <form onSubmit={handleSubmit(handleAddContact)}>
                    <label htmlFor=''>Nome</label>
                    <input type='text' placeholder='Digite o nome' {...register('first_name')} />
                    <label htmlFor=''>Sobrenome</label>
                    <input type='text' placeholder='Digite o sobrenome' {...register('last_name')} />
                    <label htmlFor=''>E-mail</label>
                    <input type='text' placeholder='Digite o telefone' {...register('email')} />
                    <label htmlFor=''>Telefone</label>
                    <input type='text' placeholder='Digite o telefone' {...register('phone')} />
                    <button onClick={closeModal}>Fechar</button>
                    <button type='submit'>Salvar</button>
                </form>
            </ReactModal>
        </>
    )
}

export default Contacts
