/* eslint-disable class-methods-use-this */
import { Op } from 'sequelize';
import IMatch from '../interfaces/IMatch';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import UnauthorizedError from '../error/UnauthorizedError';
import TeamService from './TeamService';

export default class MatchService {
  public teamService = new TeamService();

  async getAll(query: boolean | null = null): Promise<MatchModel[]> {
    const matches = await MatchModel.findAll({
      where: { inProgress: query === null ? { [Op.or]: [true, false] } : query },
      include: [
        { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
      ] });
    return matches;
  }

  async create(match: IMatch): Promise<MatchModel> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = match;

    if (homeTeam === awayTeam) {
      throw new UnauthorizedError('It is not possible to create a match with two equal teams');
    }

    await this.teamService.getById(homeTeam);
    await this.teamService.getById(awayTeam);

    const matchCreated = await MatchModel
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });

    return matchCreated;
  }
}
