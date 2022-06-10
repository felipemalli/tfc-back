import ILeaderboard from '../interfaces/ILeaderboard';
import IMatch from '../interfaces/IMatch';
import ldSchema from '../schemas/leaderboardSchema';
import IMatchFiltered from '../interfaces/IMatchFiltered';

const leaderboardUtilities = {
  createTeamBoard: (matches: IMatch[], teamId: number) => {
    const teamBoard: ILeaderboard = ldSchema.leaderboardPattern();

    matches.forEach((match) => {
      const { alliedGoals, rivalGoals } = ldSchema.defineTypeGoals(match, teamId);

      teamBoard.totalGames += 1;
      teamBoard.goalsFavor += alliedGoals;
      teamBoard.goalsOwn += rivalGoals;
      teamBoard.goalsBalance += alliedGoals - rivalGoals;

      if (alliedGoals > rivalGoals) {
        teamBoard.totalPoints += 3;
        teamBoard.totalVictories += 1;
      } else if (alliedGoals < rivalGoals) {
        teamBoard.totalLosses += 1;
      } else {
        teamBoard.totalPoints += 1;
        teamBoard.totalDraws += 1;
      }
    });

    return teamBoard;
  },

  createLeaderboard: (allMatchesFiltered: IMatchFiltered[]) => {
    const leaderboard = allMatchesFiltered.map((matches) => {
      const teamBoard = leaderboardUtilities.createTeamBoard(matches.teamMatches, matches.team.id);

      teamBoard.name = matches.team.teamName;
      teamBoard.efficiency = +((teamBoard.totalPoints / (teamBoard.totalGames * 3)) * 100)
        .toFixed(2);

      return teamBoard;
    });

    return leaderboard;
  },

  leaderboardSort: (leaderboard: ILeaderboard[]) => leaderboard.sort((a, b) => (
    b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn
  )),
};

export default leaderboardUtilities;
