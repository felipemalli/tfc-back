/* eslint-disable class-methods-use-this */
import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  public loginService = new LoginService();

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const userWithToken = await this.loginService.login(email, password);

      return res.status(200).json({ userWithToken });
    } catch (err) {
      next(err);
    }
  }
}
