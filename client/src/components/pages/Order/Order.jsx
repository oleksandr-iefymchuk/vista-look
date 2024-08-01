import './Order.scss';
import { orderTabStyles } from '../../../muiStyles';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import {
  Tab,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  ThemeProvider,
  MenuItem
} from '@mui/material';
import {
  adressInputTemplates,
  deliveryOptions,
  paymentOptions,
  userOrderInputTemplates
} from '../../../constants/inputTemplates';
import { calculateDiscountedPrice, calculatePrice } from '../../../helpers';

import ButtonWrapper from '../../common/Button/Button';
import TextMaskCustom from '../Profile/components/MaskedInput/MaskedInput';
import TotalPrice from '../../layout/TotalPrice/TotalPrice';
import { saveOrderThunk } from '../../../store/orders/thunk';
import { clearBasketThunk } from '../../../store/user/thunk';
import { addOrder } from '../../../store/orders/actionCreators';
import BasketItem from '../Basket/components/BasketItem';
// import LiqPay from '../../layout/LiqPay/LiqPay';
import { fetchPostOffice } from '../../../api';
import CityInput from '../Profile/components/CityInput/CityInput';

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id, name, surname, email, phone, basket } = useSelector(
    store => store.user
  );
  const products = useSelector(state => state.products);

  const [value, setValue] = useState('customerData');
  const [deliveryMethod, setDeliveryMethodn] = useState(deliveryOptions[0]);
  const [paymentMethod, setPaymentMethod] = useState(paymentOptions[0]);
  const [errors, setErrors] = useState({});
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    deliveryCity: '',
    street: '',
    house: '',
    apartment: '',
    deliveryAddress: ''
  });
  const [warehouses, setWarehouses] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const { totalPrice } = calculatePrice(products, basket);

  const validateFields = fields => {
    const newErrors = {};
    let valid = true;

    fields.forEach(field => {
      if (!personalInfo[field]) {
        newErrors[field] = 'Поле не може бути порожнім';
        valid = false;
      }
    });

    if (deliveryMethod === deliveryOptions[0]) {
      delete newErrors['street'];
      delete newErrors['house'];
    }

    setErrors(newErrors);
    return valid;
  };

  const handleTabChange = newValue => {
    let fieldsToValidate = [];
    if (value === 'customerData') {
      fieldsToValidate = ['name', 'surname', 'email', 'phone'];
    } else if (value === 'delivery') {
      if (deliveryMethod === deliveryOptions[0]) {
        fieldsToValidate = ['deliveryCity', 'deliveryAddress'];
      } else {
        fieldsToValidate = ['deliveryCity', 'street', 'house'];
      }
    }

    if (validateFields(fieldsToValidate)) {
      setValue(newValue);
    }
  };

  const handlePersonalInfoChange =
    id =>
    ({ target: { value } }) => {
      setPersonalInfo({ ...personalInfo, [id]: value });
      setErrors(prevErrors => ({ ...prevErrors, [id]: '' }));
    };

  const orderItems = basket
    .map(({ productId, quantity }) => {
      const product = products.find(p => p._id === productId);
      if (product) {
        const discountedPrice = calculateDiscountedPrice(
          product.price,
          product.discount
        );
        return {
          _id: product._id,
          image: product.images[0],
          title: product.title,
          price: discountedPrice,
          quantity,
          total: discountedPrice * quantity
        };
      }
      return null;
    })
    .filter(item => item !== null);

  const handleSubmit = async e => {
    e.preventDefault();

    if (
      !validateFields(
        [
          'name',
          'surname',
          'email',
          'phone',
          'deliveryCity',
          ...(deliveryMethod === deliveryOptions[0]
            ? ['deliveryAddress']
            : ['street', 'house'])
        ],
        deliveryMethod
      )
    ) {
      return;
    }

    const orderData = {
      user: {
        _id,
        name: personalInfo.name,
        surname: personalInfo.surname,
        email: personalInfo.email,
        phone: personalInfo.phone,
        deliveryCity: personalInfo.deliveryCity,
        deliveryAddress:
          deliveryMethod === deliveryOptions[0]
            ? personalInfo.deliveryAddress
            : `вул.${personalInfo.street}, буд.${personalInfo.house}, кв.${personalInfo.apartment}`
      },
      orderItems,
      deliveryMethod,
      totalPrice,
      isPaid: false,
      isDelivered: false,
      paymentMethod
    };

    const tokenString = localStorage.getItem('userInfo');

    if (paymentMethod !== 'Оплата онлайн' && tokenString) {
      const token = JSON.parse(tokenString);
      dispatch(saveOrderThunk(orderData, token, onSaveOrderSucces));
    }

    if (paymentMethod === 'Оплата онлайн') {
      dispatch(addOrder(orderData));
    }
  };

  const onSaveOrderSucces = () => {
    dispatch(clearBasketThunk());
    navigate('/');
  };

  const handleCitySelect = newValue => {
    setSelectedCity(newValue);
    setPersonalInfo(prevInfo => ({
      ...prevInfo,
      deliveryCity: newValue.display_name
    }));
    setErrors(prevErrors => ({ ...prevErrors, deliveryCity: '' }));
    fetchPostOffice(newValue.structured_formatting.locality)
      .then(departments => {
        setWarehouses(departments);
      })
      .catch(error => console.error('Error fetching warehouses:', error));
  };

  useEffect(() => {
    setPersonalInfo({
      name: name || '',
      surname: surname || '',
      email: email || '',
      phone: phone || ''
    });
  }, [name, surname, email, phone]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='order-wrap'>
      <h3>Оформлення замовлення</h3>
      <div className='order-info'>
        <ThemeProvider theme={orderTabStyles}>
          <TabContext value={value}>
            <TabList onChange={(event, newValue) => handleTabChange(newValue)}>
              <Tab label='Дані покупця' value='customerData' />
              <Tab label='Доставка' value='delivery' />
              <Tab label='Оплата' value='payment' />
            </TabList>
            <form onSubmit={handleSubmit}>
              <TabPanel value='customerData'>
                <div className='order-section'>
                  {userOrderInputTemplates.map(({ id, ...otherInputProps }) => {
                    return (
                      <TextField
                        key={id}
                        {...otherInputProps}
                        value={personalInfo[id] || ''}
                        onChange={handlePersonalInfoChange(id)}
                        size='small'
                        className='user-order-input'
                        variant='standard'
                        disabled={id === 'email'}
                        InputProps={
                          id === 'phone'
                            ? { inputComponent: TextMaskCustom }
                            : {}
                        }
                        error={!!errors[id]}
                        helperText={errors[id]}
                      />
                    );
                  })}
                  <ButtonWrapper
                    buttonClassName='btn-next'
                    onClick={() => handleTabChange('delivery')}
                    buttonText='Далі'
                  />
                </div>
              </TabPanel>
              <TabPanel value='delivery'>
                <div className='order-section'>
                  <h4>Варіант доставки</h4>
                  <RadioGroup
                    value={deliveryMethod}
                    onChange={e => setDeliveryMethodn(e.target.value)}
                  >
                    {deliveryOptions.map(option => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                    <p>* за тарифами перевізника</p>
                  </RadioGroup>
                  <div className='adress-block'>
                    <CityInput
                      selectedCity={selectedCity}
                      onCitySelect={handleCitySelect}
                      error={!!errors.deliveryCity}
                      helperText={errors.deliveryCity}
                    />
                    {deliveryMethod === deliveryOptions[0] ? (
                      <TextField
                        select
                        label='Виберіть відділення пошти'
                        variant='standard'
                        value={personalInfo.deliveryAddress || ''}
                        onChange={handlePersonalInfoChange('deliveryAddress')}
                        error={!!errors.deliveryAddress}
                        helperText={errors.deliveryAddress}
                        disabled={!warehouses.length}
                        className='user-order-input'
                      >
                        {warehouses.map((warehouse, index) => (
                          <MenuItem
                            key={`${warehouse.value}-${index}`}
                            value={warehouse.value}
                            className='user-order-input post'
                          >
                            {warehouse.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    ) : (
                      adressInputTemplates.map(({ id, ...otherInputProps }) => (
                        <TextField
                          key={id}
                          {...otherInputProps}
                          value={personalInfo[id] || ''}
                          onChange={handlePersonalInfoChange(id)}
                          size='small'
                          className='user-order-input'
                          variant='standard'
                          error={!!errors[id]}
                          helperText={errors[id]}
                        />
                      ))
                    )}
                  </div>
                  <ButtonWrapper
                    buttonClassName='btn-next'
                    onClick={() => handleTabChange('payment')}
                    buttonText='Далі'
                  />
                </div>
              </TabPanel>
              <TabPanel value='payment'>
                <div className='order-section'>
                  <h4>Метод оплати</h4>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={e => setPaymentMethod(e.target.value)}
                  >
                    {paymentOptions.map(option => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                  <p>
                    * реквізити для оплати онлайн будуть надіслані на електронну
                    пошту
                  </p>
                  <ButtonWrapper
                    buttonClassName='btn-next'
                    type='submit'
                    buttonText='Підтвердити замовлення'
                  />
                </div>
              </TabPanel>
            </form>
          </TabContext>
        </ThemeProvider>
      </div>
      <div className='current-order'>
        <h4>Ваше замовлення</h4>
        {basket.map(({ productId, quantity }) => {
          const product = products.find(p => p._id === productId);
          return product ? (
            <BasketItem
              key={productId}
              {...product}
              quantity={quantity}
              isInOrders={true}
            />
          ) : null;
        })}
        <TotalPrice />
        {/* <LiqPay
          public_key='sandbox_i89780154994'
          private_key='sandbox_vLSKy2izIhgOHcgTnhMHKCNoBUKUnZMfVnV0flSf'
          amount={totalPrice}
          currency='UAH'
          description='Оплата товара'
          order_id='6'
          server_url='https://aqua-terra.vercel.app'
        /> */}
      </div>
    </div>
  );
};

export default Order;
