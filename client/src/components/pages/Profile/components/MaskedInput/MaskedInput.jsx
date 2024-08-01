import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import PropTypes from 'prop-types';

const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask='+38 (\000) 000 00 00'
      definitions={{
        0: /[0-9]/
      }}
      inputRef={ref}
      onAccept={value => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default TextMaskCustom;
