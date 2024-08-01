import {
  GET_PRODUCTS,
  INCREASE_QUANTITY_PRODUCT,
  DECREASE_QUANTITY_PRODUCT
} from './actionTypes';

const productsInitialState = [];

const productsReducer = (state = productsInitialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return [...action.payload];

    case INCREASE_QUANTITY_PRODUCT:
      return state.map(product =>
        product.id === action.payload.id
          ? { ...product, quantity: product.quantity + action.payload.quantity }
          : product
      );

    case DECREASE_QUANTITY_PRODUCT:
      return state.map(product =>
        product.id === action.payload.id
          ? { ...product, quantity: product.quantity - action.payload.quantity }
          : product
      );

    default:
      return state;
  }
};

export default productsReducer;
