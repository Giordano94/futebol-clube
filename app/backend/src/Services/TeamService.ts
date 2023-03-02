import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/TeamModel';

export default class TeamsService {
  model: ModelStatic<TeamModel> = TeamModel;

  async getAllTeams(): Promise<TeamModel[]> {
    const allTeams = await this.model.findAll();
    return allTeams;
  }

  async getTeamById(teamId: number): Promise<TeamModel | null> {
    const team = await this.model.findByPk(teamId);
    return team;
  }
}
