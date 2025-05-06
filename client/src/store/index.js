import userReducer from './user/reducer';
import productsReducer from './products/reducer';
import appReducer from './appReduser/reducer';
import reviewsReducer from './reviews/reducer';
import ordersReducer from './orders/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { orderAddressApi } from '@/api/orderAddressApi';

export const store = configureStore({
  reducer: {
    reviews: reviewsReducer,
    user: userReducer,
    products: productsReducer,
    orders: ordersReducer,
    app: appReducer,
    [orderAddressApi.reducerPath]: orderAddressApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(orderAddressApi.middleware)
});
