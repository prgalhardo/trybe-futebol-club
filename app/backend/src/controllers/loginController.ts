import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/loginService';

class LoginController {
  constructor(private loginService = new LoginService()) { }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const loginInfos = await this.loginService.create(email, password);

      return res.status(200).json(loginInfos);
    } catch (error) {
      next(error);
    }
  };

  public findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.body.user;
      const loginInfos = await this.loginService.findOne(id);
      return res.status(200).json(loginInfos);
    } catch (error) {
      next(error);
    }
  };
}

export default LoginController;
