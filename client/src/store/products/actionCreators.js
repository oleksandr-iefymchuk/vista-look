import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  INCREASE_QUANTITY_PRODUCT,
  DECREASE_QUANTITY_PRODUCT
} from './actionTypes';

const getProducts = products => ({
  type: GET_PRODUCTS,
  payload: products
});

const addProduct = product => ({
  type: ADD_PRODUCT,
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
  addProduct,
  delProduct,
  increaseQuantityProducts,
  decreaseQuantityProducts
};
