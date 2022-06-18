import { Request, Response, NextFunction } from 'express';

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

export default validateLoginBody;
