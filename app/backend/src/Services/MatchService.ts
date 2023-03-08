import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchModel';
// import IMatch from '../Interfaces/IMatch';

export default class MatchService {
  model: ModelStatic<MatchesModel> = MatchesModel;

  async getAllMatches(query: string): Promise<MatchesModel[]> {
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

    if (query === 'true') {
      return allMatches.filter((m) => m.inProgress === true);
    }
    if (query === 'false') {
      return allMatches.filter((m) => m.inProgress === false);
    }

    return allMatches;
  }
}
