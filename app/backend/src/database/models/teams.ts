import { DataTypes, Model } from 'sequelize/types';
import db from '.';

class teams extends Model {
  team_name: string;
}

teams.init({
  team_name: DataTypes.STRING,
}, {
  sequelize: db,
  modelName: 'teams',
  underscored: true,
  timestamps: false,
});

export default teams;
