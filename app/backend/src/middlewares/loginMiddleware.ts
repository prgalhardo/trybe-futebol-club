import { Request, Response, NextFunction } from 'express';
import * as Bcrypt from 'bcryptjs';
import User from '../database/models/users';

const messageOne = 'Incorrect email or password';

function validateEmail(email: string) {
  if (!email) return ({ status: 400, message: 'All fields must be filled' });
  if (typeof email !== 'string') return ({ status: 401, message: messageOne });
  if (!email.includes('@') || !email.includes('.com')) {
    return ({ status: 401, message: messageOne });
  }
}

function validatePassword(password: string) {
  if (!password) return ({ status: 400, message: 'All fields must be filled' });
  if (typeof password !== 'string') return ({ status: 401, message: messageOne });
  if (password.length <= 6) return ({ status: 401, message: messageOne });
}

function validateLoginBody(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  let error = validateEmail(email);
  if (error) return res.status(error.status).json({ message: error.message });

  error = validatePassword(password);
  if (error) return res.status(error.status).json({ message: error.message });

  next();
}

export const validateEmailInDB = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const equalEmail = await User.findOne({ where: { email } });
  if (!equalEmail) return res.status(401).json({ message: messageOne });
  next();
};

export const validatePasswordInDB = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const equalEmail = await User.findOne({ where: { email } });
  if (!Bcrypt.compareSync(password, equalEmail?.password as string)) {
    return res.status(401).json({ message: messageOne });
  }
  next();
};

export default validateLoginBody;
