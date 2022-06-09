/* eslint-disable max-lines-per-function */
/* eslint-disable class-methods-use-this */
import MatchModel from '../database/models/MatchModel';
import TeamService from './TeamService';
import MatchService from './MatchService';
import ILeaderboard from '../interfaces/ILeaderboard';
import leaderboardPattern from '../utils/leaderboardPattern';
import ld from '../schemas/leaderboardSchema';

export default class LeaderboardService {
  public teamService = new TeamService();
  public matchService = new MatchService();

  async getAllHome() {
    const teams = await this.teamService.getAll();
    const allMatches = await MatchModel.findAll({ where: { inProgress: false } });

    const teamFiltMatches = teams.map((team) => allMatches
      .filter((matches) => team.id === matches.homeTeam));

    const leaderboard = teamFiltMatches.map((teamMatches) => {
      const initial: ILeaderboard = leaderboardPattern();

      initial.name = teams.find((team) => team.id === teamMatches[0].homeTeam)?.teamName;

      teamMatches.forEach((match) => {
        if (match.homeTeamGoals > match.awayTeamGoals) initial.totalPoints += 3;
        if (match.homeTeamGoals === match.awayTeamGoals) initial.totalPoints += 1;
        initial.totalGames += 1;
        if (match.homeTeamGoals > match.awayTeamGoals) initial.totalVictories += 1;
        if (match.homeTeamGoals === match.awayTeamGoals) initial.totalDraws += 1;
        if (match.homeTeamGoals < match.awayTeamGoals) initial.totalLosses += 1;
        initial.goalsFavor += match.homeTeamGoals;
        initial.goalsOwn += match.awayTeamGoals;
        initial.goalsBalance = initial.goalsFavor - initial.goalsOwn;
      });
      initial.efficiency = +((initial.totalPoints / (initial.totalGames * 3)) * 100).toFixed(2);

      return initial;
    });

    const orderLeaderboard = ld.leaderboardSort(leaderboard);

    return orderLeaderboard;
  }

  async getAllAway() {
    const teams = await this.teamService.getAll();
    const allMatches = await MatchModel.findAll({ where: { inProgress: false } });

    const teamFiltMatches = teams.map((team) => allMatches
      .filter((matches) => team.id === matches.awayTeam));

    const leaderboard = teamFiltMatches.map((teamMatches) => {
      const initial: ILeaderboard = leaderboardPattern();

      initial.name = teams.find((team) => team.id === teamMatches[0].awayTeam)?.teamName;

      teamMatches.forEach((match) => {
        if (match.homeTeamGoals < match.awayTeamGoals) initial.totalPoints += 3;
        if (match.homeTeamGoals === match.awayTeamGoals) initial.totalPoints += 1;
        initial.totalGames += 1;
        if (match.homeTeamGoals < match.awayTeamGoals) initial.totalVictories += 1;
        if (match.homeTeamGoals === match.awayTeamGoals) initial.totalDraws += 1;
        if (match.homeTeamGoals > match.awayTeamGoals) initial.totalLosses += 1;
        initial.goalsFavor += match.awayTeamGoals;
        initial.goalsOwn += match.homeTeamGoals;
        initial.goalsBalance = initial.goalsFavor - initial.goalsOwn;
      });
      initial.efficiency = +((initial.totalPoints / (initial.totalGames * 3)) * 100).toFixed(2);

      return initial;
    });

    const orderLeaderboard = ld.leaderboardSort(leaderboard);

    return orderLeaderboard;
  }
}
