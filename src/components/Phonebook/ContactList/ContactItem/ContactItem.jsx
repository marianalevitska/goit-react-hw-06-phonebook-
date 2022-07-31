import { memo } from 'react';
import PropTypes from 'prop-types';

import stl from './contactItem.module.css';

function ContactItem({ options, onDelete }) {
  const [id, name, number] = options;
  return (
    <li className={stl.item}>
      {name}:{number}
      <button type="button" className={stl.delete} onClick={() => onDelete(id)}>
        Delete
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default memo(ContactItem);
