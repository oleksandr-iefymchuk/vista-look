import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Basket.scss';
import BasketItem from './components/BasketItem';
import Button from '../../common/Button/Button';

import SvgIcon from '../../common/SvgIcon';
import TotalPrice from '../../layout/TotalPrice/TotalPrice';

const Basket = () => {
  const navigate = useNavigate();
  const handleOrder = () => navigate('/order');
  const handlecontinueShopping = () => navigate('/');

  const products = useSelector(state => state.products);
  const basket = useSelector(store => store.user.basket);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='basket-wrap'>
      <h2 className='basket-title'>Кошик</h2>
      <div className='basket'>
        {basket.length > 0 && (
          <Button
            buttonClassName='continue-shopping-btn'
            buttonText='Продовжити покупки'
            onClick={handlecontinueShopping}
          />
        )}

        <div className='basket-list'>
          {basket.map(({ productId, quantity, size, productCode }) => {
            const product = products.find(p => p._id === productId);
            return product ? (
              <BasketItem
                key={productId}
                {...product}
                quantity={quantity}
                size={size}
                productCode={productCode}
              />
            ) : null;
          })}
        </div>
        {basket.length > 0 ? (
          <div className='total-amount-block'>
            <TotalPrice />
            <Button
              buttonClassName='order-btn'
              buttonText='Перейти до оформлення'
              onClick={handleOrder}
            />
          </div>
        ) : (
          <div className='empty-basket'>
            <SvgIcon
              name='empty-basket'
              color='#a2a2a2'
              width='300px'
              height='200px'
            />
            <p>В кошику немає товарів. Але це ніколи не пізно виправити :) </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Basket;
