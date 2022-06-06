import { DataTypes, Model } from 'sequelize';
import db from '.';

class Teams extends Model {
  teamName: string;
}

Teams.init({
  teamName: DataTypes.STRING,
}, {
  sequelize: db,
  modelName: 'teams',
  underscored: true,
  timestamps: false,
});

export default Teams;
