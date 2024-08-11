import mongoose from 'mongoose';

const COLLECTION = 'products';

const productSchema = new mongoose.Schema({
  productCode: { type: String, required: true },
  images: { type: Array, required: true },
  sizes: { type: Array, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  discount: { type: Number, required: true },
  category: { type: String, required: true },
  dateAdded: { type: Date, required: true },
  param: { type: Object, required: true },
  description: { type: String, required: true }
});

export const productModel = mongoose.model(COLLECTION, productSchema);
