import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

export default class TeamModel extends Model {
  awayMatches(teamName: string, awayMatches: any, arg2: string[]): import("../../Interfaces/ILeaderBoard").default {
    throw new Error('Method not implemented.');
  }
  homeMatches(teamName: string, homeMatches: any, arg2: string[]): import("../../Interfaces/ILeaderBoard").default {
    throw new Error('Method not implemented.');
  }
  declare readonly id: number;
  declare teamName: string;
}

TeamModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'teams',
});
