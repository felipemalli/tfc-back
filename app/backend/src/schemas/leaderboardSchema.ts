import IMatch from '../interfaces/IMatch';

const leaderboardSchema = {
  leaderboardPattern: () => ({
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  }),

  defineTypeGoals: (match: IMatch, teamId: number) => {
    let alliedGoals = 0;
    let rivalGoals = 0;

    if (match.homeTeam === teamId) {
      alliedGoals = match.homeTeamGoals;
      rivalGoals = match.awayTeamGoals;
    } else {
      alliedGoals = match.awayTeamGoals;
      rivalGoals = match.homeTeamGoals;
    }

    return { alliedGoals, rivalGoals };
  },
};

export default leaderboardSchema;
