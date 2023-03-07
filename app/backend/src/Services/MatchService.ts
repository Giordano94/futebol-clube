import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchModel';

export default class MatchService {
  model: ModelStatic<MatchesModel> = MatchesModel;

  async getAllMatches(): Promise<MatchesModel[]> {
    const allMatches = await this.model.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'],
        },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'],
        },
      ],
      attributes: {
        exclude: ['home_team_id', 'away_team_id'],
      },
    });
    return allMatches;
  }
}
