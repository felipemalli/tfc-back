import { DataTypes, Model } from 'sequelize/types';
import db from '.';

class teams extends Model {
  username: string;
  role: string;
  email: string;
  password: string;
}

teams.init({
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize: db,
  modelName: 'teams',
  underscored: true,
  timestamps: false,
});

export default teams;
