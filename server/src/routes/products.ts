import express from 'express';
import { getAllProducts, saveProduct, deleteProduct } from '../controllers/products.controllers.js';
// import { movieValidation } from '../middlewares/validator.js';
import asyncHandler from 'express-async-handler';
import protect from '../middlewares/authMiddleware.js';

const router: express.Router = express.Router();

router.get('/', asyncHandler(getAllProducts));
router.post('/', protect, asyncHandler(saveProduct));
router.delete('/:productId', protect, asyncHandler(deleteProduct));

export default router;
