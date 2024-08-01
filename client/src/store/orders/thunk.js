import axios from 'axios';
import { getOrders } from './actionCreators';
import { showMessage } from '../user/actionCreators';
import { setLoading } from '../appReduser/actionCreators';
import { BASE_URL } from '../../constants/constants';

export const getOrdersThunk = token => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await axios.get(`${BASE_URL}/orders`, config);
      dispatch(getOrders(data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        showMessage(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
          'error'
        )
      );
    }
  };
};

export const saveOrderThunk = (orderData, token, onSaveOrderSucces) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      await axios.post(`${BASE_URL}/orders`, orderData, config);
      dispatch(setLoading(false));
      onSaveOrderSucces();
      dispatch(
        showMessage(
          'Замовлення успішно збережено. Дякуємо за покупку!',
          'success'
        )
      );
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(
        showMessage(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
          'error'
        )
      );
    }
  };
};
