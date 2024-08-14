import './ProductForm.scss';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  productArrayTemplates,
  productDataInputs,
  productParamInputs
} from '../../../../../constants/inputTemplates';
import ButtonWrapper from '../../../../common/Button/Button';
import {
  addProductThunk,
  getProductsThunk,
  updateProductThunk
} from '../../../../../store/products/thunk';

const ProductForm = () => {
  const dispatch = useDispatch();
  const { productSlug } = useParams();
  const allProducts = useSelector(state => state.products);

  const [productData, setProductData] = useState({
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
    let value = e.target.value;

    if (['price', 'quantity', 'discount'].includes(key)) {
      value = value.replace(/[^0-9.]/g, '');
      value = parseFloat(value);
      value = isNaN(value) || value === '' ? 0 : value;
    }

    setProductData({
      ...productData,
      [key]: value !== undefined ? value : ''
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

  const productToUpdate = allProducts.find(({ slug }) => slug === productSlug);

  const handleSubmit = async e => {
    e.preventDefault();
    const newProduct = {
      ...productData,
      price: parseFloat(productData.price),
      quantity: parseInt(productData.quantity),
      discount: parseFloat(productData.discount),
      param: productParam
    };
    console.log('newProduct:', newProduct);

    try {
      if (productToUpdate) {
        const updatedProduct = { ...newProduct };
        console.log('updatedProduct:', updatedProduct);

        await dispatch(updateProductThunk(productToUpdate._id, updatedProduct));
      } else {
        await dispatch(addProductThunk(newProduct));
      }

      await dispatch(getProductsThunk());

      if (!productToUpdate) {
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
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
  };

  useEffect(() => {
    if (productToUpdate) {
      const {
        productCode,
        images,
        title,
        slug,
        price,
        sizes,
        quantity,
        discount,
        category,
        dateAdded,
        param,
        description
      } = productToUpdate;

      setProductData({
        productCode,
        images,
        title,
        slug,
        price,
        sizes,
        quantity,
        discount,
        category,
        dateAdded: dateAdded
          ? new Date(dateAdded).toISOString().split('T')[0]
          : '',
        description
      });

      setProductParam({
        Товар: param?.['Товар'] || '',
        Тканина: param?.['Тканина'] || '',
        Колір: param?.['Колір'] || '',
        'Країна виробництва': param?.['Країна виробництва'] || ''
      });
    }
  }, [allProducts, productToUpdate]);

  return (
    <form className='product-form-wrap' onSubmit={handleSubmit}>
      {productDataInputs.map(({ id, ...otherInputProps }) => (
        <TextField
          key={id}
          {...otherInputProps}
          value={productData[id] !== undefined ? productData[id] : ''}
          onChange={handleProductChange(id)}
          size='small'
          className='product-input'
          InputLabelProps={{
            shrink: otherInputProps.type === 'date' || undefined
          }}
          // disabled={id === 'productCode' && !!productToUpdate}
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
            {(productData[id] || []).map((item, index) => (
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
        buttonText={productToUpdate ? 'Оновити товар' : 'Додати товар'}
        buttonClassName='add-product-btn'
      />
    </form>
  );
};

export default ProductForm;
