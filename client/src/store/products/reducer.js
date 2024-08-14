import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  INCREASE_QUANTITY_PRODUCT,
  DECREASE_QUANTITY_PRODUCT
} from './actionTypes';

const productsInitialState = [];

const productsReducer = (state = productsInitialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return [...action.payload];

    case ADD_PRODUCT:
      return [...state, action.payload];

    case UPDATE_PRODUCT:
      return state.map(product =>
        product.productCode === action.payload.productCode
          ? action.payload
          : product
      );

    case DELETE_PRODUCT:
      return state.filter(({ _id }) => _id !== action.payload);

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
