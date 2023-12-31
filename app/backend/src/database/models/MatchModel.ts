import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

export default class MatchesModel extends Model {
  declare readonly id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'matches',
});

MatchesModel.belongsTo(TeamModel, { foreignKey: 'home_team_id', as: 'homeTeam' });
TeamModel.hasMany(MatchesModel, { foreignKey: 'home_team_id', as: 'homeTeam' });

MatchesModel.belongsTo(TeamModel, { foreignKey: 'away_team_id', as: 'awayTeam' });
TeamModel.hasMany(MatchesModel, { foreignKey: 'away_team_id', as: 'awayTeam' });
