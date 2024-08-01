import { GET_REVIEWS, ADD_REVIEW, UPDATE_REVIEW } from './actionTypes';

const reviewsInitialState = [];

const reviewsReducer = (state = reviewsInitialState, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return [...action.payload];

    case ADD_REVIEW:
      return [...state, action.payload];

    case UPDATE_REVIEW:
      return state.map(review =>
        review._id === action.payload._id ? action.payload : review
      );

    default:
      return state;
  }
};

export default reviewsReducer;
