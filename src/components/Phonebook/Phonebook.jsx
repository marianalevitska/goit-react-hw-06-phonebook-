import { useState, useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import stl from './phonebook.module.css';

import { getContacts } from '../../redux/contacts/contacts-selectors';
import { actions } from 'redux/contacts/contacts-slice';

function Phonebook() {
  const contacts = useSelector(getContacts, shallowEqual);

  const dispatch = useDispatch();

  const [filter, setFilter] = useState('');
  // get files from local storage

  const addContacts = useCallback(
    data => {
      const newContactName = data.name.toLowerCase();
      const isDublicate = contacts.find(
        item => item.name.toLowerCase() === newContactName
      );
      if (isDublicate) {
        alert(`${data.name} is already in your phonebook`);
        return;
      }

      return dispatch(actions.addContacts(data));
    },
    [contacts, dispatch]
  );

  const deleteContact = useCallback(
    id => dispatch(actions.deleteContacts(id)),
    [dispatch]
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
