import axios from 'axios';
import { getProducts, delProduct } from './actionCreators';
import { setLoading } from '../appReduser/actionCreators';
import { showMessage } from '../user/actionCreators';
import { BASE_URL } from '../../constants/constants';

const getProductsThunk = () => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${BASE_URL}/products`);
      dispatch(getProducts(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      throw new Error(error);
    }
  };
};

const delProductThunk = productId => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const tokenString = localStorage.getItem('userInfo');
      if (!tokenString) {
        dispatch(
          showMessage('Ви не авторизовані. Авторизуйтесь будь-ласка!', 'error')
        );
        return;
      }
      const token = JSON.parse(tokenString);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const { status } = await axios.delete(
        `${BASE_URL}/products/${productId}`,
        config
      );

      if (status === 200) dispatch(delProduct(productId));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      throw new Error(error);
    }
  };
};

export { getProductsThunk, delProductThunk };
