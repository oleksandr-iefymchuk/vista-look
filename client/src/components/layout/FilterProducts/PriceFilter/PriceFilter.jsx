import { useState, useEffect, useCallback } from 'react';
import { Input, Slider } from '@mui/material';
import PropTypes from 'prop-types';

import './PriceFilter.scss';

import ButtonWrapper from '../../../common/Button/Button';

const PriceFilter = ({ products, setFilteredProducts }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const getMinPrice = useCallback(() => {
    if (products.length === 0) return 0;
    return Math.min(...products.map(product => product.price));
  }, [products]);

  const getMaxPrice = useCallback(() => {
    if (products.length === 0) return 0;
    return Math.max(...products.map(product => product.price));
  }, [products]);

  const handleMinInputChange = event => {
    let newMinPrice;
    if (event.target.value === '') {
      newMinPrice = 0;
    } else {
      newMinPrice = parseInt(event.target.value, 10);
      newMinPrice = newMinPrice.toString();
    }
    setMinPrice(newMinPrice);
  };

  const handleMaxInputChange = event => {
    let newMaxPrice;
    if (event.target.value === '') {
      newMaxPrice = 0;
    } else {
      newMaxPrice = parseInt(event.target.value, 10);
      newMaxPrice = newMaxPrice.toString();
    }
    setMaxPrice(newMaxPrice);
  };

  const handlePriceRangeChange = (event, newValue) => {
    const [newMinPrice, newMaxPrice] = newValue;
    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
  };

  const applyPriceFilter = () => {
    const filtered = products.filter(
      product => product.price >= minPrice && product.price <= maxPrice
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    setMinPrice(getMinPrice());
    setMaxPrice(getMaxPrice());
  }, [getMinPrice, getMaxPrice]);

  return (
    <div className='price-filter'>
      <h4>Ціна:</h4>
      <Slider
        className='range-slider'
        value={[parseInt(minPrice), parseInt(maxPrice)]}
        onChange={handlePriceRangeChange}
        min={getMinPrice()}
        max={getMaxPrice()}
        valueLabelDisplay='off'
        aria-labelledby='range-slider'
        getAriaValueText={value => value.toString()}
      />
      <div className='price-inputs'>
        <Input
          className='min-price-input'
          value={minPrice}
          margin='dense'
          inputProps={{
            step: 1,
            min: getMinPrice(),
            max: maxPrice,
            type: 'number'
          }}
          onChange={handleMinInputChange}
        />{' '}
        <span> - </span>
        <Input
          className='max-price-input'
          value={maxPrice}
          margin='dense'
          inputProps={{
            step: 1,
            min: minPrice,
            max: getMaxPrice(),
            type: 'number'
          }}
          onChange={handleMaxInputChange}
        />
        <ButtonWrapper
          buttonClassName='btn-price-filter'
          buttonText='OK'
          onClick={applyPriceFilter}
        />
      </div>
    </div>
  );
};

PriceFilter.propTypes = {
  products: PropTypes.array.isRequired,
  setFilteredProducts: PropTypes.func.isRequired
};
export default PriceFilter;
