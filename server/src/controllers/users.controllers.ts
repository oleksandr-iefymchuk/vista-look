import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { userModel } from '../models/users.js';
import { User } from '../interfaces.js';

import generateToken from '../utils/generateToken.js';
import sendingMail from '../utils/sendingMail.js';

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  const user = (req as Request & { user?: User }).user;
  if (user) {
    const userData: User | null = await userModel.findById(user._id);
    if (userData) {
      res.json({
        _id: userData._id,
        name: userData.name,
        surname: userData.surname,
        phone: userData.phone,
        city: userData.city,
        address: userData.address,
        email: userData.email,
        isAdmin: userData.isAdmin,
        favorites: userData.favorites,
        basket: userData.basket,
        isActivated: user.isActivated,
        authType: userData.authType,
        createdAt: userData.createdAt
      });
    } else {
      res.status(404).json({ message: 'Користувач не знайдений!' });
    }
  } else {
    res.status(401).json({ message: 'Не вдалося авторизуватися!' });
  }
};

export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  const user = (req as Request & { user?: User }).user;

  if (!user) {
    res.status(401).json({ message: 'Не вдалося авторизуватися!' });
    return;
  }

  try {
    const { name, email, surname, phone, city, address } = req.body;

    const updatedData = {
      name: name || user.name,
      email: email || user.email,
      surname: surname || user.surname,
      phone: phone || user.phone,
      city: city || user.city,
      address: address || user.address
    };

    const updatedUser = await userModel.findByIdAndUpdate(user._id, updatedData, { new: true });

    if (!updatedUser) {
      res.status(404).json({ message: 'Користувач не знайдений!' });
      return;
    }

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      surname: updatedUser.surname,
      phone: updatedUser.phone,
      city: updatedUser.city,
      address: updatedUser.address,
      isAdmin: updatedUser.isAdmin,
      favorites: updatedUser.favorites,
      basket: updatedUser.basket,
      isActivated: updatedUser.isActivated,
      authType: updatedUser.authType,
      createdAt: updatedUser.createdAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Внутрішня помилка сервера!' });
  }
};

export const updateUserPassword = async (req: Request, res: Response): Promise<void> => {
  const user = (req as Request & { user?: User }).user;

  if (!user) {
    res.status(401).json({ message: 'Не вдалося авторизуватися!' });
    return;
  }

  try {
    const { currentPassword, newPassword } = req.body;

    const userData: User | null = await userModel.findById(user._id);

    if (!userData) {
      res.status(404).json({ message: 'Користувач не знайдений!' });
      return;
    }

    if (userData.authType !== 'google') {
      const isMatchPassword = await userData.matchPassword(currentPassword);
      if (!isMatchPassword) {
        res.status(401).json({ message: 'Невірний поточний пароль!' });
        return;
      }
    }

    await userModel.findByIdAndUpdate(user._id, { password: newPassword });

    res.json({ message: 'Пароль успішно оновлено!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Внутрішня помилка сервера!' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user: User | null = await userModel.findOne({ email });

    if (!user) {
      res.status(401).json({ message: 'Користувача не знайдено!' });
    }

    const isMatchPassword = await user?.matchPassword(password);
    if (!isMatchPassword) {
      res.status(401).json({ message: 'Невірний пароль!' });
    }

    if (user && isMatchPassword) {
      res.json({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        phone: user.phone,
        city: user.city,
        address: user.address,
        email: user.email,
        isAdmin: user.isAdmin,
        favorites: user.favorites,
        basket: user.basket,
        isActivated: user.isActivated,
        token: generateToken(user._id),
        authType: user.authType,
        createdAt: user.createdAt
      });
    } else {
      res.status(401).json({ message: 'Невірний логін або пароль!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Внутрішня помилка сервера!' });
  }
};

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "Ім'я, Е-пошта та пароль обов'язкові!" });
      return;
    }

    const userExist: User | null = await userModel.findOne({ email });
    if (userExist) {
      res.status(400).json({ message: `Користувач з поштою ${email} вже зареєстрований!` });
    }

    const activationLink = uuidv4();
    const user = await userModel.create({ name, email, password, activationLink, authType: 'local' });
    if (user) {
      res.status(201).json({ message: 'Успішна реєстрація!' });
    } else {
      res.status(400).json({ message: 'Недійсні дані користувача!' });
    }

    await sendingMail(email, `https://${process.env.API_URL}/users/activate/${activationLink}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Внутрішня помилка сервера!' });
    next(error);
  }
};

export const activate = async (req: Request, res: Response): Promise<void> => {
  const activationLink: string = req.params.link;
  try {
    const userExist: User | null = await userModel.findOneAndUpdate(
      { activationLink },
      { $set: { isActivated: true } },
      { new: true }
    );
    if (!userExist) {
      res.status(401).json({ message: 'Користувача не знайдено!' });
      return;
    }
    res.redirect(process.env.CLIENT_URL!);
  } catch (error) {
    console.error('Помилка при активації користувача:', error);
    res.status(500).json({ message: 'Помилка при активації користувача' });
  }
};

export const googleUserRegistration = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email } = req.body;

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({ name, email, password: 'no-pass', isActivated: true, authType: 'google' });
    }

    const userToken = generateToken(user._id.toString());
    res.json({ token: userToken });
  } catch (error) {
    console.error('Помилка обробки аутентифікації Google:', error);
    res.status(500).json({ message: 'Внутрішня помилка сервера!' });
  }
};

export const addToFavorites = async (req: Request, res: Response): Promise<void> => {
  const user = (req as Request & { user?: User }).user;
  const { productId } = req.body;
  if (!user) {
    res.status(401).json({ message: 'Ви не авторизовані. Авторизуйтесь будь-ласка!' });
    return;
  }
  try {
    const updatedUser: User | null = (await userModel
      .findOneAndUpdate(
        { _id: user._id, favorites: { $ne: productId } },
        { $push: { favorites: productId } },
        { new: true }
      )
      .select('-password -createdAt -updatedAt -__v')) as User;

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Внутрішня помилка сервера!' });
  }
};

export const removeFromFavorites = async (req: Request, res: Response): Promise<void> => {
  const user = (req as Request & { user?: User }).user;
  const { productId } = req.body;

  if (!productId) {
    res.status(400).json({ message: "ID товару є обо'язковим" });
    return;
  }

  if (!user) {
    res.status(401).json({ message: 'Ви не авторизовані. Авторизуйтесь будь-ласка!' });
    return;
  }
  if (!user.favorites.includes(productId)) {
    res.status(404).json({ message: 'Товар не знайдено в обраних' });
    return;
  }

  try {
    const updatedUser: User | null = (await userModel
      .findOneAndUpdate({ _id: user._id }, { $pull: { favorites: productId } }, { new: true })
      .select('-password -createdAt -updatedAt -__v')) as User;

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Внутрішня помилка сервера!' });
  }
};

export const addToBasket = async (req: Request, res: Response): Promise<void> => {
  const user = (req as Request & { user?: User }).user;
  const { productId, productCode, quantity, size } = req.body;
  if (!user) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }
  try {
    const updatedUser: User | null = (await userModel
      .findOneAndUpdate(
        { _id: user._id, 'basket.productId': { $ne: productId } },
        { $push: { basket: { productId, productCode, quantity, size } } },
        { new: true }
      )
      .select('-password -createdAt -updatedAt -__v')) as User;

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const removeFromBasket = async (req: Request, res: Response): Promise<void> => {
  const user = (req as Request & { user?: User }).user;
  const { productId } = req.body;

  if (!productId) {
    res.status(400).json({ message: 'ProductId is required' });
    return;
  }

  if (!user) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }
  const productToRemove = user.basket.find((item) => item.productId.toString() === productId);
  if (!productToRemove) {
    res.status(404).json({ message: 'Product not found in basket' });
    return;
  }

  try {
    const updatedUser: User | null = (await userModel
      .findOneAndUpdate({ _id: user._id }, { $pull: { basket: { productId } } }, { new: true })
      .select('-password -createdAt -updatedAt -__v')) as User;

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const clearBasket = async (req: Request, res: Response): Promise<void> => {
  const user = (req as Request & { user?: User }).user;

  if (!user) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  try {
    const updatedUser: User | null = (await userModel
      .findOneAndUpdate({ _id: user._id }, { $set: { basket: [] } }, { new: true })
      .select('-password -createdAt -updatedAt -__v')) as User;

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const increaseQuantityInBasket = async (req: Request, res: Response): Promise<void> => {
  const user = (req as Request & { user?: User }).user;
  const { productId } = req.body;

  if (!productId) {
    res.status(400).json({ message: 'ProductId is required' });
    return;
  }

  if (!user) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  const productToIncrease = user.basket.find((item) => item.productId.toString() === productId);
  if (!productToIncrease) {
    res.status(404).json({ message: 'Product not found in basket' });
    return;
  }

  try {
    const updatedUser: User | null = (await userModel
      .findOneAndUpdate(
        { _id: user._id, 'basket.productId': productId },
        { $inc: { 'basket.$.quantity': 1 } },
        { new: true }
      )
      .select('-password -createdAt -updatedAt -__v')) as User;

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const decreaseQuantityInBasket = async (req: Request, res: Response): Promise<void> => {
  const user = (req as Request & { user?: User }).user;
  const { productId } = req.body;

  if (!productId) {
    res.status(400).json({ message: 'ProductId is required' });
    return;
  }

  if (!user) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  const productToDecrease = user.basket.find((item) => item.productId.toString() === productId);
  if (!productToDecrease) {
    res.status(404).json({ message: 'Product not found in basket' });
    return;
  }

  try {
    const updatedUser: User | null = (await userModel
      .findOneAndUpdate(
        { _id: user._id, 'basket.productId': productId, 'basket.quantity': { $gt: 1 } },
        { $inc: { 'basket.$.quantity': -1 } },
        { new: true }
      )
      .select('-password -createdAt -updatedAt -__v')) as User;

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
