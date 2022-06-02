/* eslint-disable class-methods-use-this */
import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import ILoggedUser from '../interfaces/ILoggedUser';
import UsersModel from '../database/models/UsersModel';
import jwtConfig from '../config/jwtConfig';
import UnauthorizedError from '../error/UnauthorizedError';

export default class LoginService {
  async login(email: string, password: string): Promise<ILoggedUser> {
    const userFind = await UsersModel.findOne({ where: { email } });

    if (!userFind || !compareSync(password, userFind.password)) {
      throw new UnauthorizedError('Incorrect email or password');
    }

    const { id, username, role } = userFind;

    const token = sign({ id }, jwtConfig.secret, jwtConfig.config);

    return {
      user: { id, username, role, email },
      token,
    };
  }

  async validate(email: string): Promise<string> {
    const userFind = await UsersModel.findOne({ where: { email } });

    if (!userFind) throw new UnauthorizedError('Incorrect email');

    return userFind.role;
  }
}
