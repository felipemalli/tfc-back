/* eslint-disable class-methods-use-this */
import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import ILoggedUser from '../interfaces/ILoggedUser';
import UserModel from '../database/models/UserModel';
import jwtConfig from '../config/jwtConfig';
import UnauthorizedError from '../error/UnauthorizedError';

export default class LoginService {
  async login(email: string, password: string): Promise<ILoggedUser | null> {
    const userFind = await UserModel.findOne({ where: { email } });

    if (!userFind || !compareSync(password, userFind.password)) {
      throw new UnauthorizedError('Incorrect email or password');
    }

    // if (!userFind) throw new UnauthorizedError('Incorrect email or password');

    const token = sign({ email }, jwtConfig.secret, jwtConfig.config);

    const { id, username, role } = userFind;

    return {
      user: { id, username, role, email },
      token,
    };
  }

  async validate(email: string): Promise<string> {
    const userFind = await UserModel.findOne({ where: { email } });

    if (!userFind) throw new UnauthorizedError('Incorrect email');

    return userFind.role;
  }
}
