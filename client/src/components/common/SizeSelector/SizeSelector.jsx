import './SizeSelector.scss';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

const SizeSelector = ({
  sizes,
  selectedSize,
  onSelectSize,
  productId,
  isDisabled
}) => {
  const handleSizeChange = size => {
    onSelectSize(size);
  };

  return (
    <div className='size-selector'>
      <p>Виберіть розмір:</p>
      <div className='sizes'>
        {sizes?.map((size, index) => (
          <Fragment key={index}>
            <input
              type='checkbox'
              id={`size-${productId}-${size}`}
              className='size-checkbox'
              checked={selectedSize === size}
              onChange={() => handleSizeChange(size)}
              disabled={isDisabled}
            />
            <label
              htmlFor={`size-${productId}-${size}`}
              className={`size-label ${isDisabled ? 'disabled-label' : ''}`}
            >
              {size}
            </label>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

SizeSelector.propTypes = {
  sizes: PropTypes.array,
  selectedSize: PropTypes.number,
  onSelectSize: PropTypes.func,
  productId: PropTypes.string,
  isDisabled: PropTypes.bool
};

export default SizeSelector;
