import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { userModel } from '../models/users.js';

const protect = asyncHandler(async (req: Request & { user?: unknown }, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'qwerty') as JwtPayload;
      req.user = await userModel.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Не вдалося авторизуватися, невірний токен' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Не вдалося авторизуватися, невірний токен' });
  }
});

export default protect;
