import './styles.sass'


interface IContact {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

interface IContactCardProps {
    contact: IContact;
}

const ContactCard: React.FC<IContactCardProps> = ({ contact }) => {
    return (
        <li className="contact-card-container">
            <div>
                <h2>{contact.first_name} {contact.last_name}</h2>
            </div>
            <div>
                <h2>
                    {contact.email}
                </h2>
            </div>
            <div>
                <h2>
                    {contact.phone}
                </h2>
            </div>
        </li>
    )
}

export default ContactCard