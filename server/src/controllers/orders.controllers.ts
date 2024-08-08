import { Request, Response } from 'express';
import { orderModel } from '../models/orders.js';
import { Orders, User } from '../interfaces.js';

export const saveOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const authUser = (req as Request & { user?: User }).user;

    if (!authUser) {
      res.status(401).json({ message: 'Користувача не знайдено!' });
    }

    const { user, orderItems, deliveryMethod, totalPrice, isPaid, isDelivered, paymentMethod } = req.body;

    if (
      !user ||
      !orderItems ||
      !deliveryMethod ||
      !totalPrice ||
      isPaid === undefined ||
      isDelivered === undefined ||
      !paymentMethod
    ) {
      res.status(400).json({ message: "Всі поля обов'язкові для створення замовлення!" });
      return;
    }

    const newOrder = await orderModel.create({
      user,
      orderItems,
      deliveryMethod,
      totalPrice,
      isPaid,
      isDelivered,
      paymentMethod
    });

    res.status(201).json({ message: 'Замовлення успішно створено!', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Внутрішня помилка сервера!' });
  }
};

export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as Request & { user?: User }).user;

    if (user) {
      const orders: Orders[] | null = await orderModel.find({ 'user._id': user._id });
      res.json(orders);
    } else {
      res.status(401).json({ message: 'Не вдалося авторизуватися!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Внутрішня помилка сервера!' });
  }
};

export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as Request & { user?: User }).user;
    const { startDate, endDate } = req.query;

    if (user && user.isAdmin) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      end.setDate(end.getDate() + 1);

      const query: { createdAt?: { $gte: Date; $lt: Date } } = {};
      if (startDate && endDate) {
        query.createdAt = { $gte: start, $lt: end };
      }

      const orders: Orders[] | null = await orderModel.find(query);
      res.json(orders);
    } else {
      res.status(403).json({ message: 'Недостатньо прав для виконання даної операції!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Внутрішня помилка сервера!' });
  }
};
