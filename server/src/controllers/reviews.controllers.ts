import { Request, Response, NextFunction } from 'express';
import { reviewModel } from '../models/reviews.js';
import { Review, User } from '../interfaces.js';
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

export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as Request & { user?: User }).user;
    const { reviewId } = req.params;

    if (!reviewId) {
      res.status(400).json({ message: "ID відгуку є обо'язковим" });
      return;
    }

    if (!user) {
      res.status(401).json({ message: 'Ви не авторизовані!' });
      return;
    }

    const deletedReview = await reviewModel.findByIdAndDelete(reviewId);

    if (deletedReview) {
      res.status(200).json({ message: 'Відгук успішно видалено.' });
    } else {
      res.status(404).json({ message: 'Не вдалося видалити відгук.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Внутрішня помилка сервера!' });
  }
};
