import PropTypes from 'prop-types';
import './OrderItem.scss';

const OrderItem = ({ productCode, image, title, price, quantity, size }) => {
  const totalPrice = price * quantity;

  return (
    <div className='order-item'>
      <div className='order-item-info'>
        <img src={image} alt={title} />
        <p>
          {title} (Код: {productCode})
        </p>
      </div>
      <p className='size'>Розмір: {size}</p>
      <div className='order-cost-block'>
        <div className='order-cost'>
          <p className='price'>
            {new Intl.NumberFormat(undefined, {
              style: 'currency',
              currency: 'UAH'
            }).format(price)}
          </p>
          <p className='multiplication'>x</p>
          <p className='quantity'>{quantity}</p>
        </div>
        <p className='total-price'>
          {new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'UAH'
          }).format(totalPrice)}
        </p>
      </div>
    </div>
  );
};

OrderItem.propTypes = {
  productCode: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  size: PropTypes.number
};

export default OrderItem;
