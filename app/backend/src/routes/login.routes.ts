import { Router } from 'express';
import validateLoginBody from '../middlewares/loginMiddleware';
import LoginController from '../controllers/loginController';

const loginRoutes = Router();
const loginInfos = new LoginController();

loginRoutes.post('/login', validateLoginBody, loginInfos.create);
loginRoutes.get('/login');

export default loginRoutes;
