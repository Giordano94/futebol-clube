import MatchesModel from '../database/models/MatchModel';
import ILeaderBoard from '../Interfaces/ILeaderBoard';
import { teamPoints, teamBalance, teamGoals,
  countVictories, countDraws, countLosses } from './countersLeaderBoard';

type bothGoals = 'homeTeamGoals' | 'awayTeamGoals';

const firstVetor: bothGoals[] = ['homeTeamGoals', 'awayTeamGoals'];
const secondVetor: bothGoals[] = ['awayTeamGoals', 'homeTeamGoals'];

export const orderedLeaderBoard = (teams: ILeaderBoard[]) => {
  teams.sort((teamA, teamB) => {
    const pointDiff = teamB.totalPoints - teamA.totalPoints;
    if (pointDiff !== 0) return pointDiff;

    const victoryDiff = teamB.totalVictories - teamA.totalVictories;
    if (victoryDiff !== 0) return victoryDiff;

    const goalDiff = teamB.goalsBalance - teamA.goalsBalance;
    if (goalDiff !== 0) return goalDiff;

    const favorDiff = teamB.goalsFavor - teamA.goalsFavor;
    if (favorDiff !== 0) return favorDiff;

    return teamA.goalsOwn - teamB.goalsOwn;
  });
  return teams;
};

export function sumEfficiency(home: MatchesModel[], away: MatchesModel[]): string {
  const points = teamPoints(home, firstVetor) + teamPoints(away, secondVetor);
  const allMatches = home.length + away.length;
  return ((points / (allMatches * 3)) * 100).toFixed(2);
}

export const createLeaderBoardAllTeams = (
  team: string,
  home : MatchesModel[],
  away: MatchesModel[],
) => ({
  name: team,
  totalPoints: teamPoints(home, firstVetor) + teamPoints(away, secondVetor),
  totalGames: home.length + away.length,
  totalVictories: countVictories(home, firstVetor)
  + countVictories(away, secondVetor),
  totalDraws: countDraws(home, firstVetor) + countDraws(away, secondVetor),
  totalLosses: countLosses(home, firstVetor) + countLosses(away, secondVetor),
  goalsFavor: teamGoals(home, firstVetor[0]) + teamGoals(away, firstVetor[1]),
  goalsOwn: teamGoals(home, firstVetor[1]) + teamGoals(away, firstVetor[0]),
  goalsBalance: teamBalance(home, firstVetor) + teamBalance(away, secondVetor),
  efficiency: sumEfficiency(home, away),
});
