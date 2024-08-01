import {
  GET_PRODUCTS,
  INCREASE_QUANTITY_PRODUCT,
  DECREASE_QUANTITY_PRODUCT
} from './actionTypes';

const getProducts = product => ({
  type: GET_PRODUCTS,
  payload: product
});

const increaseQuantityProducts = (id, quantity) => ({
  type: INCREASE_QUANTITY_PRODUCT,
  payload: { id, quantity }
});

const decreaseQuantityProducts = (id, quantity) => ({
  type: DECREASE_QUANTITY_PRODUCT,
  payload: { id, quantity }
});

export { getProducts, increaseQuantityProducts, decreaseQuantityProducts };
