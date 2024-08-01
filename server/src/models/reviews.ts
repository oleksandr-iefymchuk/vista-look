import mongoose from 'mongoose';

const COLLECTION = 'reviews';

const replySchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  comment: { type: String, required: true },
  date: { type: Date, required: true }
});

const reviewSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, required: true },
  replies: [replySchema]
});

export const reviewModel = mongoose.model(COLLECTION, reviewSchema);
