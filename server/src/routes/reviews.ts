import express from 'express';
import { getAllReviews, createReview, updateReview, deleteReview } from '../controllers/reviews.controllers.js';
import { asyncWrapper } from '../asyncWrapper.js';
import asyncHandler from 'express-async-handler';
import protect from '../middlewares/authMiddleware.js';

const router: express.Router = express.Router();

router.get('/', asyncWrapper(getAllReviews));
router.post('/', asyncWrapper(createReview));
router.put('/:id', asyncWrapper(updateReview));
router.delete('/:reviewId', protect, asyncHandler(deleteReview));

export default router;
