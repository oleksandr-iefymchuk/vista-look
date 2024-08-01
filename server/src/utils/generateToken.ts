import jwt from 'jsonwebtoken';

const generateToken = (id: string): string => {
  return jwt.sign({ id }, 'qwerty', { expiresIn: '30d' });
};

export default generateToken;
