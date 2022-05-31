import { DataTypes, Model } from 'sequelize/types';
import db from '.';

class users extends Model {
  username: string;
  role: string;
  email: string;
  password: string;
}

users.init({
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

export default users;
