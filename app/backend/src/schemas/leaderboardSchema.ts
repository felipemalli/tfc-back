import ILeaderboard from '../interfaces/ILeaderboard';

const leaderboardSchema = {
  // findName: (value:string) => (!value),

  leaderboardSort: (leaderboard: ILeaderboard[]) => leaderboard.sort((a, b) => (
    b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn
  )),
};

export default leaderboardSchema;
