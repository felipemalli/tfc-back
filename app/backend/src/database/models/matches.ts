import { DataTypes, Model } from 'sequelize/types';
import db from '.';

class matches extends Model {
  home_team: string;
  home_team_goals: string;
  away_team: string;
  away_team_goals: string;
  in_progress: boolean;
}

matches.init({
  home_team: DataTypes.STRING,
  home_team_goals: DataTypes.STRING,
  away_team: DataTypes.STRING,
  away_team_goals: DataTypes.STRING,
  in_progress: DataTypes.BOOLEAN,
}, {
  sequelize: db,
  modelName: 'matches',
  underscored: true,
  timestamps: false,
});

export default matches;
