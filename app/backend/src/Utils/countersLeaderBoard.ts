import MatchesModel from '../database/models/MatchModel';

type bothGoals = 'homeTeamGoals' | 'awayTeamGoals';

export function countVictories(matches: MatchesModel[], side: bothGoals[]) {
  let teamVictories = 0;
  for (let i = 0; i < matches.length; i += 1) {
    if (matches[i][side[0]] > matches[i][side[1]]) {
      teamVictories += 1;
    }
  }
  return teamVictories;
}

export function countDraws(matches: MatchesModel[], side: bothGoals[]) {
  let teamDraws = 0;
  for (let i = 0; i < matches.length; i += 1) {
    if (matches[i][side[0]] === matches[i][side[1]]) {
      teamDraws += 1;
    }
  }
  return teamDraws;
}

export function teamPoints(matches: MatchesModel[], side: bothGoals[]) {
  const victories = countVictories(matches, side);
  const draws = countDraws(matches, side);
  const points = victories * 3 + draws;
  return points;
}

export function TeamEfficiency(matches: MatchesModel[], side: bothGoals[]): string {
  const points = teamPoints(matches, side);
  const allMatches = (matches.length * 3);
  return ((points / allMatches) * 100).toFixed(2);
}

export function countLosses(matches: MatchesModel[], side: bothGoals[]) {
  let teamLosses = 0;
  for (let i = 0; i < matches.length; i += 1) {
    if (matches[i][side[0]] < matches[i][side[1]]) {
      teamLosses += 1;
    }
  }
  return teamLosses;
}

export const teamGoals = (matches: MatchesModel[], side: bothGoals) =>
  matches.reduce((goal, match) => goal + match[side], 0);

export const teamBalance = (matches: MatchesModel[], side: bothGoals[]): number =>
  teamGoals(matches, side[0]) - teamGoals(matches, side[1]);

export const createLeaderBoardTeam = (
  team: string,
  matches: MatchesModel[],
  side: bothGoals[],
) => ({
  name: team,
  totalPoints: teamPoints(matches, side),
  totalGames: matches.length,
  totalVictories: countVictories(matches, side),
  totalDraws: countDraws(matches, side),
  totalLosses: countLosses(matches, side),
  goalsFavor: teamGoals(matches, side[0]),
  goalsOwn: teamGoals(matches, side[1]),
  goalsBalance: teamBalance(matches, side),
  efficiency: TeamEfficiency(matches, side),
});
