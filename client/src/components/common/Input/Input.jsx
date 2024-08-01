import PropTypes from 'prop-types';
import './Input.scss';

const InputWrapper = ({
  label,
  placeholder,
  onChangeInput,
  type,
  id,
  value,
  htmlFor
}) => {
  return (
    <div className='input-block'>
      {label && (
        <label className='label' htmlFor={htmlFor}>
          {label}
        </label>
      )}
      <input
        className='input-body'
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChangeInput}
      ></input>
    </div>
  );
};

InputWrapper.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeInput: PropTypes.func,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  htmlFor: PropTypes.string
};

export default InputWrapper;
