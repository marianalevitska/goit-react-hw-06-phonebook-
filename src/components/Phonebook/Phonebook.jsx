import { useState, useCallback, useEffect, useRef } from 'react';

import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import stl from './phonebook.module.css';

function Phonebook() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');
  // get files from local storage

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      const data = localStorage.getItem('contacts');
      const contacts = JSON.parse(data); //todo JSON.parse - convert string to object
      if (contacts?.length) {
        setContacts(contacts);
      }
    }
  }, []);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem('contacts', JSON.stringify(contacts)); //todo JSON.parse - convert string to object
    }
  }, [contacts]);

  const addContacts = useCallback(
    ({ name, number }) => {
      const newContactName = name.toLowerCase();
      const isDublicate = contacts.find(
        item => item.name.toLowerCase() === newContactName
      );
      if (isDublicate) {
        alert(`${name} is alredy in your phonebook`);
        return;
      }

      setContacts(prevContacts => {
        const newContact = {
          id: nanoid(),
          name,
          number,
        };
        return [...prevContacts, newContact];
      });
    },
    [contacts, setContacts]
  );

  const deleteContact = useCallback(
    id => {
      const newContacts = contacts.filter(item => item.id !== id);
      setContacts(newContacts);
    },
    [contacts, setContacts]
  );

  const filterChange = useCallback(
    ({ target }) => {
      const { value } = target;
      setFilter(value);
    },
    [setFilter]
  );

  const getContactsFiltered = useCallback(() => {
    if (!filter) {
      return contacts;
    }

    const filterRequest = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filterRequest);
    });
    return filteredContacts;
  }, [filter, contacts]);

  const filteredResult = getContactsFiltered();

  return (
    <div>
      <ContactForm onSubmit={addContacts} />

      <Filter filter={filter} onFilter={filterChange} />
      {!filteredResult.length && (
        <p className={stl.alert}>
          Життя має в точності ту цінність, якою ми хочемо її наділити - хочеш
          знайти запис, спочатку збережи його
        </p>
      )}
      <ContactList contacts={filteredResult} onDelete={deleteContact} />
    </div>
  );
}

export default Phonebook;
