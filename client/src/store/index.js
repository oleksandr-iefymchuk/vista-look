import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

import userReducer from './user/reducer';
import productsReducer from './products/reducer';
import appReducer from './appReduser/reducer';
import reviewsReducer from './reviews/reducer';
import ordersReducer from './orders/reducer';

const rootReducer = combineReducers({
  reviews: reviewsReducer,
  user: userReducer,
  products: productsReducer,
  orders: ordersReducer,
  app: appReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
