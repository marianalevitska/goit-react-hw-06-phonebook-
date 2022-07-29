import stl from './contactItem.module.css';

function ContactItem({ options, onDelete }) {
    // const { name, number, id } = params; - object
    /*const [name,number,id] = params; - array*/
    const [id, name, number] = options;
    return (
        <li className={stl.item}>
            {name}:{number}
            <button type='button' className={stl.delete} onClick={() => onDelete(id)}>Delete</button>
        </li>
    )
}

export default ContactItem;