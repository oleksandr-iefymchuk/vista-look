import axios from 'axios';
import { getProducts } from './actionCreators';
import { setLoading } from '../appReduser/actionCreators';
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

export { getProductsThunk };
