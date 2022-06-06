import { DataTypes, Model } from 'sequelize';
import db from '.';

class Users extends Model {
  username: string;
  role: 'admin' | 'user';
  email: string;
  password: string;
}

Users.init({
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize: db,
  modelName: 'users',
  underscored: true,
  timestamps: false,
});

export default Users;
