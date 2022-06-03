/* eslint-disable class-methods-use-this */
import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  // public loginService = new LoginService();

  async login(req: Request, res: Response, next: NextFunction) {
    const loginService = new LoginService();
    const { email, password } = req.body;

    try {
      const userWithToken = await loginService.login(email, password);

      return res.status(200).json(userWithToken);
    } catch (err) {
      next(err);
    }
  }

  async validate(req: Request, res: Response, next: NextFunction) {
    const loginService = new LoginService();
    const { email } = req.body.authToken;

    try {
      const userRole = await loginService.validate(email);

      return res.status(200).json({ userRole });
    } catch (err) {
      next(err);
    }
  }
}
