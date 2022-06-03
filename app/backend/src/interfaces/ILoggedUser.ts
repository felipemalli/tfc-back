// import UsersModel from '../database/models/UsersModel';
import IUser from './IUser';

interface ILoggedUser {
  user: IUser | null;
  token: string;
}

export default ILoggedUser;
