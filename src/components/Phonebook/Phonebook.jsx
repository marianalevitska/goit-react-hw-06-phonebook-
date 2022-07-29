import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

class Phonebook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  // get files from local storage

  componentDidMount() {
    const data = localStorage.getItem('contacts');
    const contacts = JSON.parse(data);
    if (data?.length) {
      this.setState({ contacts }); // JSON.parse - convert string to object
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContacts = ({ name, number }) => {
    // this.setState({ contacts: item.contacts.value })
    const { contacts } = this.state;
    const newContactName = name.toLowerCase();
    const isDublicate = contacts.find(
      item => item.name.toLowerCase() === newContactName
    );
    if (isDublicate) {
      alert(`${name} is alredy in your phonebook`);
      return;
    }

    this.setState(prevState => {
      const { contacts } = prevState;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return {
        contacts: [...contacts, newContact],
      };
    });
  };

  deleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(item => item.id !== id),
    }));
  };

  filterChange = ({ target }) => {
    const { value } = target;
    this.setState({
      filter: value,
    });
  };

  getContactsFiltered = () => {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }
    const filterRequest = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) => {
      const result = name.toLowerCase().includes(filterRequest);
      return result;
    });
    return filteredContacts;
  };

  render() {
    const { filter } = this.state;
    const filteredResult = this.getContactsFiltered();
    return (
      <div>
        <ContactForm onSubmit={this.addContacts} />
        <Filter filter={filter} onFilter={this.filterChange} />
        <ContactList contacts={filteredResult} onDelete={this.deleteContact} />
      </div>
    );
  }
}

export default Phonebook;
