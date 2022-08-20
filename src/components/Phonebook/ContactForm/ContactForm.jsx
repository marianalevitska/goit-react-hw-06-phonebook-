import { memo, useCallback, useState } from 'react';
// import { nanoid } from 'nanoid';

import stl from './contactForm.module.css';
function ContactForm({ onSubmit }) {
  const [state, setState] = useState({
    name: '',
    number: '',
  });

  const handleChange = useCallback(
    ({ target }) => {
      const { name, value } = target;
      setState({ ...state, [name]: value });
    },
    [setState, state]
  );

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      onSubmit(state);
      setState({ name: '', number: '' });
    },
    [setState, state, onSubmit]
  );

  const { name, number } = state;
  return (
    <form className={stl.form} onSubmit={handleSubmit}>
      <label htmlFor="name" className={stl.label}>
        Name
      </label>
      <input
        placeholder="Please enter your name"
        value={name}
        id="name"
        className={stl.input_line}
        type="text"
        name="name"
        pattern="^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChange}
      />
      <label htmlFor="tel" className={stl.label}>
        Contacts
      </label>
      <input
        className={stl.input_line}
        value={number}
        placeholder="Please enter your phone number"
        id="tel"
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleChange} /* function call */
      />
      <button type="submit" className={stl.button}>
        Add contact
      </button>
    </form>
  );
}

export default memo(ContactForm);
