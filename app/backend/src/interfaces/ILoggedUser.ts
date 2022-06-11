import IUser from './IUser';

interface ILoggedUser {
  user: IUser | null;
  token: string;
}

export default ILoggedUser;
