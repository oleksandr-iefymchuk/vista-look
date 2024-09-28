import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './BasketItem.scss';

import ButtonWrapper from '../../../common/Button/Button';

import { calculateDiscountedPrice } from '../../../../helpers';
import {
  decreaseQuantityInBasketThunk,
  increaseQuantityInBasketThunk,
  removeFromBasketThunk
} from '../../../../store/user/thunk';

const BasketItem = ({
  _id,
  productCode,
  images,
  title,
  price,
  quantity,
  size,
  discount,
  isInOrders = false
}) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(store => store.user);
  // const products = useSelector(state => state.products);
  // const currentProduct = products.find(product => product._id === _id);

  const oldTotalPrice = price * quantity;
  const newTotalPrice = calculateDiscountedPrice(price, discount) * quantity;

  const handleRemoveFromBasket = () => {
    if (isAuthenticated) {
      dispatch(removeFromBasketThunk(_id));
    }
  };

  const handleIncreaseQuantity = () => {
    if (isAuthenticated) {
      dispatch(increaseQuantityInBasketThunk(_id));
    }
  };

  const handleDecreaseQuantity = () => {
    if (isAuthenticated) {
      dispatch(decreaseQuantityInBasketThunk(_id));
    }
  };

  return (
    <div className='basket-item'>
      <div className='basket-item-info'>
        <img src={images[0]} alt={title} />
        <p>
          {title} (Код: {productCode})
        </p>
      </div>
      <p className='size'>Розмір: {size}</p>
      <div className='basket-cost-block'>
        <div className='quantity-control-btn'>
          {!isInOrders && (
            <ButtonWrapper
              buttonClassName={
                quantity <= 1
                  ? 'disabled-btn-increase-quantity'
                  : 'active-btn-increase-quantity'
              }
              disabled={quantity <= 1}
              onClick={handleDecreaseQuantity}
              icon='minus'
            />
          )}

          <p className='quantity'>{quantity}</p>
          {!isInOrders && (
            <ButtonWrapper
              buttonClassName={
                quantity >= 10
                  ? 'disabled-btn-increase-quantity'
                  : 'active-btn-increase-quantity'
              }
              disabled={quantity >= 10}
              onClick={handleIncreaseQuantity}
              icon='plus'
            />
          )}
        </div>
        <div className='price'>
          <p className={discount > 0 ? 'old-price' : 'new-price'}>
            {new Intl.NumberFormat(undefined, {
              style: 'currency',
              currency: 'UAH'
            }).format(oldTotalPrice)}
          </p>

          {discount > 0 && (
            <p className='new-price'>
              {new Intl.NumberFormat(undefined, {
                style: 'currency',
                currency: 'UAH'
              }).format(newTotalPrice)}
            </p>
          )}
        </div>
        {!isInOrders && (
          <ButtonWrapper
            buttonClassName='delete-btn'
            onClick={() => handleRemoveFromBasket('decrease')}
            icon='close'
          />
        )}
      </div>
    </div>
  );
};

BasketItem.propTypes = {
  _id: PropTypes.string,
  productCode: PropTypes.string,
  images: PropTypes.array,
  title: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  discount: PropTypes.number,
  isInOrders: PropTypes.bool
};

export default BasketItem;
