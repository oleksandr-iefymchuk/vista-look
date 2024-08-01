import express from 'express';
import { getUserOrders, saveOrder } from '../controllers/orders.controllers.js';
import asyncHandler from 'express-async-handler';

import protect from '../middlewares/authMiddleware.js';
const router: express.Router = express.Router();

router.get('/', protect, asyncHandler(getUserOrders));
router.post('/', protect, asyncHandler(saveOrder));

export default router;
