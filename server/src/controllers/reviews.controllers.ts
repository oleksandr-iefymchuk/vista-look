import { Request, Response, NextFunction } from 'express';
import { reviewModel } from '../models/reviews.js';
import { Review } from '../interfaces.js';
import { HttpError } from '../errors/httpError.js';
import { apiErrors } from '../constants.js';

export const getAllReviews = async (req: Request, res: Response): Promise<void> => {
  const products: Review[] = await reviewModel.find({});
  res.json(products);
};

export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, userName, userEmail, rating, comment, replies } = req.body;
    const date = new Date().toISOString();
    const newReview = new reviewModel({
      productId,
      userName,
      userEmail,
      rating,
      comment,
      date,
      replies
    });
    const savedReview: Review | null = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateReview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { productId, userName, userEmail, rating, comment, replies } = req.body;
  const date = new Date().toISOString();
  const updatedReview: Review | null = await reviewModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        productId,
        userName,
        userEmail,
        rating,
        comment,
        date,
        replies
      }
    },
    { new: true, fields: { _id: 0, __v: 0 } }
  );
  if (updatedReview) {
    res.json(updatedReview);
  } else {
    next(new HttpError(apiErrors.NOT_FOUND, 404));
  }
};
