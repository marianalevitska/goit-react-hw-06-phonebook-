import stl from './contactList.module.css';
import ContactItem from './ContactItem';

function ContactList({ contacts, onDelete }) {

    const elements = contacts.map(({ id, name, number }) => (
        <ContactItem
            key={id}
            options={[id, name, number]}
            onDelete={onDelete}
        />
    ));
    return (
        <ul className={stl.list}>
            {elements}
        </ul>
    )
}


export default ContactList;