import express from 'express';
import { getAllProducts, deleteProduct } from '../controllers/products.controllers.js';
// import { movieValidation } from '../middlewares/validator.js';
import asyncHandler from 'express-async-handler';
import protect from '../middlewares/authMiddleware.js';

const router: express.Router = express.Router();

router.get('/', asyncHandler(getAllProducts));
router.delete('/:productId', protect, asyncHandler(deleteProduct));

export default router;
