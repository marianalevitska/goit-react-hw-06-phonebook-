import { Component } from 'react';
// import { nanoid } from 'nanoid';

import stl from './contactForm.module.css';
class ContactForm extends Component {
    state = {
        name: '',
        number: ''
    };

    handleClick = ({ target }) => {
        const { name, value } = target;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.setState({ name: '', number: '' });
    };

    render() {
        const { name, number } = this.state;
        return (
            <form className={stl.form} onSubmit={this.handleSubmit}>
                <label htmlFor='name' className={stl.label}>Name</label>
                <input
                    placeholder='Please enter your name'
                    value={name}
                    id='name'
                    className={stl.input_line}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={this.handleClick}
                />
                <label htmlFor='tel' className={stl.label}>Contacts</label>
                <input
                    className={stl.input_line}
                    value={number}
                    placeholder='Please enter your phone number'
                    id='tel'
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={this.handleClick} /* function call */
                />
                <button type='submit' className={stl.button}>Add contact</button>
            </form>
        )
    }
}


export default ContactForm;