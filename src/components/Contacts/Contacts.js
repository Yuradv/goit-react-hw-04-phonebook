import PropTypes from 'prop-types';
import s from './Contacts.module.css';

function Contacts({ contacts, onDeleteContact }) {
  return (
    <ul className={s.list}>
      {contacts.map(contact => {
        return (
          <li key={contact.id} className={s.item}>
            <p>
              {contact.name}: {contact.number}
            </p>
            <button
              className={s.button}
              type="button"
              onClick={() => onDeleteContact(contact.id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default Contacts;
