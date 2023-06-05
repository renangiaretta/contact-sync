import { useEffect, useState } from 'react'
import { api } from '../../../../services/api'
import ContactCard from '../ContactCard/index'


const Contacts = () => {

    const [ contacts, setContacts ] = useState([])

    useEffect(() => {
        async function getContacts () {
            try {
                const response = await api.get('contacts')
                console.log(response)
                setContacts(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        getContacts()
    }, [])

    return (
        <div className='contacts-container'>
            <ul className='contacts-list'>
                {contacts.map(contact => <ContactCard contact={contact} />)}
            </ul>
        </div>
    )
}

export default Contacts