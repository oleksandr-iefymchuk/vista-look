// import {
//   increaseQuantityBasket,
//   decreaseQuantityBasket
// } from './user/actionCreators';

// import {
//   decreaseQuantityProducts,
//   increaseQuantityProducts
// } from './products/actionCreators';

// const updateQuantityThunk = (id, quantity, operation) => {
//   return async (dispatch, getState) => {
//     const state = getState();
//     const product = state.products.find(product => product.id === id);
//     // const basketProduct = state.user.basket.find(
//     //   (product) => product.id === id,
//     // );
//     try {
//       if (operation === 'increase' && product && product.quantity > 0) {
//         dispatch(decreaseQuantityProducts(id, quantity));
//         dispatch(increaseQuantityBasket(id, quantity));
//       } else if (operation === 'decrease' && product) {
//         dispatch(decreaseQuantityBasket(id, quantity));
//         dispatch(increaseQuantityProducts(id, quantity));
//       }
//     } catch (error) {
//       throw new Error(error);
//     }
//   };
// };

// export { updateQuantityThunk };
