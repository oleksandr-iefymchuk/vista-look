import { GET_ORDERS, ADD_ORDER, CLEAR_ORDER } from './actionTypes';

const ordersInitialState = {
  orders: [],
  newOrder: null
};

const ordersReducer = (state = ordersInitialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: [...action.payload]
      };

    case ADD_ORDER:
      return {
        ...state,
        newOrder: action.payload
      };

    case CLEAR_ORDER:
      return {
        ...state,
        newOrder: null
      };

    default:
      return state;
  }
};

export default ordersReducer;
