import { useEffect, useState } from 'react';
import { api } from '../../../../services/api';
import ContactCard, { IContact } from '../ContactCard/index';

const Contacts: React.FC = () => {
    const [contacts, setContacts] = useState<IContact[]>([]);

    useEffect(() => {
        async function getContacts() {
        try {
            const response = await api.get('contacts');
            setContacts(response.data);
        } catch (error) {
            console.error(error);
        }
        }
        getContacts();
    }, []);

    const handleContactUpdate = async (updatedContact: IContact) => {
        try {
        await api.patch(`contacts/${updatedContact.id}`, updatedContact);
        setContacts((prevContacts) => {
            return prevContacts.map((contact) => {
            if (contact.id === updatedContact.id) {
                return updatedContact;
            }
            return contact;
            });
        });
        } catch (error) {
        console.error(error);
        }
    };

    const handleContactDelete = async (contactId: number) => {
        try {
        await api.delete(`contacts/${contactId}`);
        setContacts((prevContacts) => {
            return prevContacts.filter((contact) => contact.id !== contactId);
        });
        } catch (error) {
        console.error(error);
        }
    };

    if (!contacts) {
        return <div>Carregando...</div>;
    }

    return (
        <>
        <div className='contacts-container'>
            <button>Adicionar Contato</button>
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
        </>
    );
};

export default Contacts;
