import './ProductForm.scss';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';

import {
  productArrayTemplates,
  productDataInputs,
  productParamInputs
} from '../../../../../constants/inputTemplates';
import ButtonWrapper from '../../../../common/Button/Button';
import { addProductThunk } from '../../../../../store/products/thunk';

const ProductForm = () => {
  const dispatch = useDispatch();

  const [productData, setProductData] = useState({
    productCode: '',
    images: [],
    title: '',
    slug: '',
    price: '',
    sizes: [],
    quantity: '',
    discount: '',
    category: '',
    dateAdded: '',
    description: ''
  });

  const [productParam, setProductParam] = useState({
    Товар: '',
    Тканина: '',
    Колір: '',
    'Країна виробництва': ''
  });

  const [newValue, setNewValue] = useState({
    images: '',
    sizes: ''
  });

  const handleProductChange = key => e => {
    setProductData({
      ...productData,
      [key]: e.target.value
    });
  };

  const handleParamChange = key => e => {
    setProductParam({
      ...productParam,
      [key]: e.target.value
    });
  };

  const addItemToArray = (key, value) => {
    if (value) {
      const newValue = key === 'sizes' ? parseFloat(value) : value;

      setProductData(prevData => ({
        ...prevData,
        [key]: [...prevData[key], newValue]
      }));

      setNewValue(prev => ({ ...prev, [key]: '' }));
    }
  };

  const removeItemFromArray = (key, indexToRemove) => {
    setProductData(prevData => ({
      ...prevData,
      [key]: prevData[key].filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newProduct = {
      ...productData,
      param: productParam
    };
    console.log('newProduct:', newProduct);

    dispatch(addProductThunk(newProduct));

    setProductData({
      productCode: '',
      images: [],
      title: '',
      slug: '',
      price: 0,
      sizes: [],
      quantity: 0,
      discount: 0,
      category: '',
      dateAdded: '',
      description: ''
    });

    setProductParam({
      Товар: '',
      Тканина: '',
      Колір: '',
      'Країна виробництва': ''
    });

    setNewValue({
      images: '',
      sizes: ''
    });
  };

  return (
    <form className='product-form-wrap' onSubmit={handleSubmit}>
      {productDataInputs.map(({ id, ...otherInputProps }) => (
        <TextField
          key={id}
          {...otherInputProps}
          value={productData[id]}
          onChange={handleProductChange(id)}
          size='small'
          className='product-input'
          InputLabelProps={{
            shrink: otherInputProps.type === 'date' || undefined
          }}
          required
        />
      ))}

      {productArrayTemplates.map(({ id, ...otherInputProps }) => (
        <div className='product-array-item' key={id}>
          <div className='product-input-container'>
            <TextField
              key={id}
              {...otherInputProps}
              value={newValue[id]}
              onChange={e => setNewValue({ ...newValue, [id]: e.target.value })}
              size='small'
              className='product-input-field'
            />
            <ButtonWrapper
              type='button'
              buttonText='Додати'
              buttonClassName='product-form-btn'
              onClick={() => addItemToArray(id, newValue[id])}
            />
          </div>
          <div className='added-product-parameter'>
            {productData[id].map((item, index) => (
              <div className='product-parameter' key={index}>
                <p>{item}</p>
                <ButtonWrapper
                  type='button'
                  icon='minus'
                  buttonClassName='product-param-btn'
                  onClick={() => removeItemFromArray(id, index)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {productParamInputs.map(({ id, ...otherInputProps }) => (
        <TextField
          key={id}
          {...otherInputProps}
          value={productParam[id]}
          onChange={handleParamChange(id)}
          size='small'
          className='product-input'
          required
        />
      ))}

      <ButtonWrapper
        type='submit'
        buttonText='Додати товар'
        buttonClassName='add-product-btn'
      />
    </form>
  );
};

export default ProductForm;
