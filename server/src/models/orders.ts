// import mongoose from 'mongoose';

// const COLLECTION = 'orders';

// const orderItemSchema = new mongoose.Schema({
//   image: { type: String, required: true },
//   title: { type: String, required: true },
//   price: { type: Number, required: true },
//   quantity: { type: Number, required: true },
//   total: { type: Number, required: true }
// });

// const orderSchema = new mongoose.Schema({
//   orderNumber: { type: Number, unique: true },
//   userId: { type: String, required: true },
//   orderItems: { type: [orderItemSchema], required: true },
//   deliveryOption: {
//     type: String,
//     required: true,
//     enum: ['Самовывоз', 'Доставка новой почтой', 'Доставка укрпочтой']
//   },
//   deliveryAddress: { type: String, required: true },
//   totalPrice: { type: Number, required: true },
//   isPaid: { type: Boolean, required: true },
//   isDelivered: { type: Boolean, required: true },
//   dateAdded: { type: Date, default: Date.now, required: true },
//   paymentMethod: { type: String, required: true }
// });

// orderSchema.plugin(AutoIncrement, { inc_field: 'orderNumber' });

// export const orderModel = mongoose.model(COLLECTION, orderSchema);

import mongoose, { Schema } from 'mongoose';

const COLLECTION = 'orders';

const orderItemSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
  productCode: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  size: { type: [Number, String], required: true },
  total: { type: Number, required: true }
});

const userSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  deliveryCity: { type: String, required: true },
  deliveryAddress: { type: String, required: true }
});

const orderSchema = new Schema(
  {
    orderNumber: { type: Number, unique: true },
    user: { type: userSchema, required: true },
    orderItems: { type: [orderItemSchema], required: true },
    deliveryMethod: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true },
    isDelivered: { type: Boolean, required: true },
    paymentMethod: { type: String, required: true }
  },
  { timestamps: { createdAt: true } }
);

orderSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const lastOrder = await orderModel.findOne({}, {}, { sort: { orderNumber: -1 } });
      if (lastOrder && lastOrder.orderNumber) {
        this.orderNumber = lastOrder.orderNumber + 1;
      } else {
        this.orderNumber = 1;
      }
    } catch (err) {
      return next();
    }
  }
  next();
});

export const orderModel = mongoose.model(COLLECTION, orderSchema);
