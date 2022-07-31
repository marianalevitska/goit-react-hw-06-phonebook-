import { memo } from 'react';
import PropTypes from 'prop-types';

import stl from './contactList.module.css';
import ContactItem from './ContactItem';

function ContactList({ contacts, onDelete }) {
  const elements = contacts.map(({ id, name, number }) => (
    <ContactItem key={id} options={[id, name, number]} onDelete={onDelete} />
  ));
  return <ul className={stl.list}>{elements}</ul>;
}

ContactList.defaultProps = {
  contacts: [],
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default memo(ContactList);
