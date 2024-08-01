import express from 'express';
import { getAllReviews, createReview, updateReview } from '../controllers/reviews.controllers.js';
import { asyncWrapper } from '../asyncWrapper.js';
// import { movieValidation } from '../middlewares/validator.js';

const router: express.Router = express.Router();

router.get('/', asyncWrapper(getAllReviews));
router.post('/', asyncWrapper(createReview));
router.put('/:id', asyncWrapper(updateReview));

export default router;
