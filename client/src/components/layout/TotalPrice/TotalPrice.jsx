import './TotalPrice.scss';
import { useSelector } from 'react-redux';

import { calculatePrice } from '../../../helpers';

const TotalPrice = () => {
  const products = useSelector(state => state.products);
  const basket = useSelector(store => store.user.basket);

  const { sum, totalDiscount, totalPrice } = calculatePrice(products, basket);

  return (
    <div className='total-price-wrapp'>
      <p>
        Сума:
        <span className='sum'>
          {new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'UAH'
          }).format(sum)}
        </span>
      </p>
      <p>
        Знижка:
        <span className='total-discount'>
          {new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'UAH'
          }).format(totalDiscount)}
        </span>
      </p>
      <p>
        Всього до сплати:
        <span className='total-amount'>
          {new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'UAH'
          }).format(totalPrice)}
        </span>
      </p>
    </div>
  );
};

export default TotalPrice;
