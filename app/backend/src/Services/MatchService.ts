import { ModelStatic } from 'sequelize';
import IMatchAtributesGoals from '../Interfaces/IMatchAtributesGoals';
import TeamModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchModel';

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

  finishMatchById = async (id: number) => {
    await this.model.update({ inProgress: false }, { where: { id } });
    const validResponse = { status: 200, message: 'Finished' };

    return validResponse;
  };

  updateAtributesMatches = async (atributes: IMatchAtributesGoals, id: number) => {
    await this.model.update(atributes, { where: { id } });
    const validResponse = { status: 200, message: ' updated atributes' };

    return validResponse;
  };
}
