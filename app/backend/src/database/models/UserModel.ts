import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

export default class UserModel extends Model {
  declare readonly id: number;
  declare userName: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

UserModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  username: {
    allowNull: false,
    type: STRING,
  },
  role: {
    allowNull: false,
    type: STRING,
  },
  email: {
    allowNull: false,
    type: STRING,
  },
  password: {
    allowNull: false,
    type: STRING,
  },
}, {

  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'users',
});
