import {
  SET_USER_DATA,
  LOGOUT,
  MESSAGE_USER,
  MESSAGE_CLEARING
} from './actionTypes';

export const setUserData = userData => ({
  type: SET_USER_DATA,
  payload: userData
});

export const logout = () => ({
  type: LOGOUT
});

export const showMessage = (message, messageType) => ({
  type: MESSAGE_USER,
  payload: { message, messageType }
});

export const clearMessage = () => {
  return {
    type: MESSAGE_CLEARING
  };
};

// export const removeFromFavorites = id => ({
//   type: REMOVE_FROM_FAVORITES,
//   payload: id
// });

// export const addToBasket = product => ({
//   type: ADD_TO_BASKET,
//   payload: product
// });

// export const increaseQuantityBasket = (id, quantity) => ({
//   type: INCREASE_QUANTITY_BASKET,
//   payload: { id, quantity }
// });

// export const decreaseQuantityBasket = (id, quantity) => ({
//   type: DECREASE_QUANTITY_BASKET,
//   payload: { id, quantity }
// });

// export const removeFromBasket = id => ({
//   type: REMOVE_FROM_BASKET,
//   payload: id
// });
