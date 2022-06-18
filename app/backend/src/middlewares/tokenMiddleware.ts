import { Request, Response, NextFunction } from 'express';
import Token from '../helpers/generateToken';

function TokenAuthorization(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(500).json('Token does not exist');
  try {
    const token = Token.decode(authorization);
    req.body.user = token;
    return next();
  } catch (error) {
    return res.status(401).json({ error });
  }
}

export default TokenAuthorization;
