import PropTypes from 'prop-types';
import s from './Filter.module.css';

function Filter({ filter, onChange }) {
  return (
    <label className={s.label}>
      Find contacts by name
      <input
        type="text"
        onChange={onChange}
        value={filter}
        className={s.input}
      ></input>
    </label>
  );
}

Filter.propTypes = {
  onChange: PropTypes.func,
  filter: PropTypes.string,
};

export default Filter;
