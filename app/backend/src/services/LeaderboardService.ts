import MatchModel from '../database/models/MatchModel';
import TeamService from './TeamService';
import ldUtilities from '../utils/leaderboardUtilities';

export default class LeaderboardService {
  public teamService = new TeamService();

  async getAll() {
    const teams = await this.teamService.getAll();
    const allMatches = await MatchModel.findAll({ where: { inProgress: false } });

    const allMatchesFiltered = teams.map((team) => ({
      teamMatches: allMatches.filter((m) => team.id === m.homeTeam || team.id === m.awayTeam),
      team,
    }));

    const leaderboard = ldUtilities.createLeaderboard(allMatchesFiltered);
    const orderLeaderboard = ldUtilities.leaderboardSort(leaderboard);

    return orderLeaderboard;
  }

  async getAllHome() {
    const teams = await this.teamService.getAll();
    const allMatches = await MatchModel.findAll({ where: { inProgress: false } });

    const allMatchesFiltered = teams.map((team) => ({
      teamMatches: allMatches.filter((m) => team.id === m.homeTeam),
      team,
    }));

    const leaderboardHome = ldUtilities.createLeaderboard(allMatchesFiltered);
    const orderLeaderboardHome = ldUtilities.leaderboardSort(leaderboardHome);

    return orderLeaderboardHome;
  }

  async getAllAway() {
    const teams = await this.teamService.getAll();
    const allMatches = await MatchModel.findAll({ where: { inProgress: false } });

    const allMatchesFiltered = teams.map((team) => ({
      teamMatches: allMatches.filter((m) => team.id === m.awayTeam),
      team,
    }));

    const leaderboardAway = ldUtilities.createLeaderboard(allMatchesFiltered);
    const orderLeaderboardAway = ldUtilities.leaderboardSort(leaderboardAway);

    return orderLeaderboardAway;
  }
}
