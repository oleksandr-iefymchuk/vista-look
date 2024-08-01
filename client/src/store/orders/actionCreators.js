import { GET_ORDERS, ADD_ORDER, CLEAR_ORDER } from './actionTypes';

export const getOrders = orders => ({
  type: GET_ORDERS,
  payload: orders
});

export const addOrder = order => ({
  type: ADD_ORDER,
  payload: order
});

export const clearrder = () => ({
  type: CLEAR_ORDER
});
