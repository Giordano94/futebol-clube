import { ModelStatic } from 'sequelize';
import { createLeaderBoardAllTeams, orderedLeaderBoard } from '../Utils/countersAllLeaderBoard';
import { createLeaderBoardTeam } from '../Utils/countersLeaderBoard';
import ILeaderBoard from '../Interfaces/ILeaderBoard';
import MatchesModel from '../database/models/MatchModel';
import TeamsModel from '../database/models/TeamModel';

export default class LeaderBoardService {
  protected modelMatches: ModelStatic<MatchesModel> = MatchesModel;
  protected modelTeams: ModelStatic<TeamsModel> = TeamsModel;

  async createHomeTeamLeaderBoard(): Promise<ILeaderBoard[]> {
    const [teams, matches] = await Promise.all([this.modelTeams.findAll(),
      this.modelMatches.findAll({ where: { inProgress: false } })]);

    const board: { [teamName: string]: ILeaderBoard } = {};

    for (let i = 0; i < teams.length; i += 1) {
      const team = teams[i];
      board[team.teamName] = createLeaderBoardTeam(
        team.teamName,
        matches.filter((match) => match.homeTeamId === team.id),
        ['homeTeamGoals', 'awayTeamGoals'],
      );
    }

    return orderedLeaderBoard(Object.values(board));
  }

  async createAwayTeamLeaderBoard(): Promise<ILeaderBoard[]> {
    const [teams, matches] = await Promise.all([this.modelTeams.findAll(),
      this.modelMatches.findAll({ where: { inProgress: false } })]);

    const board: { [teamName: string]: ILeaderBoard } = {};

    for (let i = 0; i < teams.length; i += 1) {
      const team = teams[i];
      board[team.teamName] = createLeaderBoardTeam(
        team.teamName,
        matches.filter((match) => match.awayTeamId === team.id),
        ['awayTeamGoals', 'homeTeamGoals'],
      );
    }

    return orderedLeaderBoard(Object.values(board));
  }

  async createAllTeamsLeaderBoard(): Promise<ILeaderBoard[]> {
    const [teams, matches] = await Promise.all([this.modelTeams.findAll(),
      this.modelMatches.findAll({ where: { inProgress: false } })]);

    const board: { [teamName: string]: ILeaderBoard } = {};

    for (let i = 0; i < teams.length; i += 1) {
      const team = teams[i];
      const home = [];
      const away = [];
      for (let j = 0; j < matches.length; j += 1) {
        const match = matches[j];
        if (match.homeTeamId === team.id) {
          home.push(match);
        } else if (match.awayTeamId === team.id) {
          away.push(match);
        }
      }
      board[team.teamName] = createLeaderBoardAllTeams(team.teamName, home, away);
    }
    return orderedLeaderBoard(Object.values(board));
  }
}
