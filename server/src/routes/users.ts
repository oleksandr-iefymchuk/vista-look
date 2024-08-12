import express from 'express';
import {
  loginUser,
  registerUser,
  addToFavorites,
  addToBasket,
  removeFromFavorites,
  removeFromBasket,
  increaseQuantityInBasket,
  decreaseQuantityInBasket,
  getUserProfile,
  googleUserRegistration,
  activate,
  updateUserProfile,
  updateUserPassword,
  clearBasket,
  updateBasketItemSize
} from '../controllers/users.controllers.js';
import { asyncWrapper } from '../asyncWrapper.js';
import asyncHandler from 'express-async-handler';

import protect from '../middlewares/authMiddleware.js';
const router: express.Router = express.Router();

router.post('/login', asyncWrapper(loginUser));
router.post('/register', asyncHandler(registerUser));
router.post('/register/google', asyncHandler(googleUserRegistration));
router.put('/update-profile', protect, updateUserProfile);
router.put('/update-password', protect, updateUserPassword);
router.get('/activate/:link', asyncHandler(activate));
router.get('/profile', protect, asyncWrapper(getUserProfile));
router.put('/favorites/add', protect, asyncWrapper(addToFavorites));
router.put('/basket/add', protect, asyncWrapper(addToBasket));
router.put('/favorites/remove', protect, asyncWrapper(removeFromFavorites));
router.put('/basket/remove', protect, asyncWrapper(removeFromBasket));
router.put('/basket/clear', protect, asyncWrapper(clearBasket));
router.put('/basket/inc', protect, asyncWrapper(increaseQuantityInBasket));
router.put('/basket/dec', protect, asyncWrapper(decreaseQuantityInBasket));
router.put('/basket/size', protect, asyncWrapper(updateBasketItemSize));
export default router;
