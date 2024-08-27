import axios from 'axios';
import {
  getReviews,
  addReview,
  updateReview,
  delReview
} from './actionCreators';
import { setLoading } from '../appReduser/actionCreators';
import { showMessage } from '../user/actionCreators';

import { BASE_URL } from '../../constants/constants';

const getReviewsThunk = (maxRetries = 5, retryDelay = 4000) => {
  return async dispatch => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    let attempts = 0;

    while (attempts < maxRetries) {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(`${BASE_URL}/reviews`);
        dispatch(getReviews(response.data));
        dispatch(setLoading(false));
        return;
      } catch (error) {
        attempts++;
        console.error(`Attempt ${attempts} failed:`, error);

        if (attempts < maxRetries) {
          await sleep(retryDelay);
        } else {
          dispatch(setLoading(false));
          console.error('Max retry attempts reached. Could not fetch reviews.');
          throw new Error(error);
        }
      }
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
