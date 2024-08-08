import axios from 'axios';
import {
  getReviwes,
  addReview,
  updateReview,
  delReview
} from './actionCreators';
import { setLoading } from '../appReduser/actionCreators';
import { showMessage } from '../user/actionCreators';

import { BASE_URL } from '../../constants/constants';

const getReviewsThunk = () => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${BASE_URL}/reviews`);
      dispatch(getReviwes(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      throw new Error(error);
    }
  };
};

const addReviewThunk = review => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${BASE_URL}/reviews`, review);
      const result = response.data;
      dispatch(addReview(result));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      throw new Error(error);
    }
  };
};

const updateReviewThunk = review => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const response = await axios.put(
        `${BASE_URL}/reviews/${review._id}`,
        review
      );

      const result = response.data;
      dispatch(updateReview(result));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      throw new Error(error);
    }
  };
};

const delReviewThunk = reviewId => {
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
        `${BASE_URL}/reviews/${reviewId}`,
        config
      );

      if (status === 200) dispatch(delReview(reviewId));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      throw new Error(error);
    }
  };
};

export { getReviewsThunk, addReviewThunk, updateReviewThunk, delReviewThunk };
