import { Router } from 'express';
import UserService from '../services/loginService';

const loginRoutes = Router();
const loginInfos = new UserService();

loginRoutes.post('/login', async (req, res, _next) => {
  const { email, password } = req.body;
  const result = await loginInfos.create(email, password);
  return res.status(200).json(result);
});

export default loginRoutes;
