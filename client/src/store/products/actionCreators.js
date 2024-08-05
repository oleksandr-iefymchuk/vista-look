import {
  GET_PRODUCTS,
  DELETE_PRODUCT,
  INCREASE_QUANTITY_PRODUCT,
  DECREASE_QUANTITY_PRODUCT
} from './actionTypes';

const getProducts = product => ({
  type: GET_PRODUCTS,
  payload: product
});

const delProduct = id => ({
  type: DELETE_PRODUCT,
  payload: id
});

const increaseQuantityProducts = (id, quantity) => ({
  type: INCREASE_QUANTITY_PRODUCT,
  payload: { id, quantity }
});

const decreaseQuantityProducts = (id, quantity) => ({
  type: DECREASE_QUANTITY_PRODUCT,
  payload: { id, quantity }
});

export {
  getProducts,
  delProduct,
  increaseQuantityProducts,
  decreaseQuantityProducts
};
