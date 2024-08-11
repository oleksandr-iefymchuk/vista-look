import axios from 'axios';
import { getProducts, delProduct, addProduct } from './actionCreators';
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

const addProductThunk = productData => {
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

      const data = await axios.post(
        `${BASE_URL}/products`,
        productData,
        config
      );

      dispatch(addProduct(data));
      dispatch(showMessage('Товар успішно створений!', 'success'));
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

export { getProductsThunk, addProductThunk, delProductThunk };
