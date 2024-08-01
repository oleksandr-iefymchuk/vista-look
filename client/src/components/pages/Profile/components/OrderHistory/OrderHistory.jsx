import './OrderHistory.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersThunk } from '../../../../../store/orders/thunk';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatDate } from '../../../../../helpers';
import OrderItem from './components/OrderItem';

const OrderHistory = () => {
  const tokenString = localStorage.getItem('userInfo');
  const dispatch = useDispatch();
  const { orders } = useSelector(state => state.orders);

  useEffect(() => {
    if (tokenString) {
      const token = JSON.parse(tokenString);
      dispatch(getOrdersThunk(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='order-history-wrap'>
      <h3>Історія замовлень</h3>
      {orders.map(order => (
        <Accordion key={order._id} className='order-box'>
          <AccordionSummary
            className='order-box-summary'
            sx={{
              '.MuiAccordionSummary-content.Mui-expanded': {
                margin: '5px 0'
              }
            }}
            expandIcon={<ExpandMoreIcon style={{ color: '#3e77aa' }} />}
          >
            <div className='order-header'>
              <h4>Замовлення №{order.orderNumber}</h4>
              <p>Створене: {formatDate(order.createdAt)}</p>
              <h4>
                Загальна сума:{' '}
                {new Intl.NumberFormat(undefined, {
                  style: 'currency',
                  currency: 'UAH'
                }).format(order.totalPrice)}
              </h4>
            </div>
          </AccordionSummary>
          <AccordionDetails className='order-item-details'>
            {order.orderItems.map(item => (
              <OrderItem key={item._id} {...item} />
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default OrderHistory;
