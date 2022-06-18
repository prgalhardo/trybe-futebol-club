import { Router } from 'express';
import validateLoginBody from '../middlewares/loginMiddleware';
import LoginController from '../controllers/loginController';
import TokenAuthorization from '../middlewares/tokenMiddleware';

const loginRoutes = Router();
const loginInfos = new LoginController();

loginRoutes.post('/login', validateLoginBody, loginInfos.create);
loginRoutes.get('/login/validate', TokenAuthorization, loginInfos.findOne);

export default loginRoutes;
