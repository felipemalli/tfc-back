/* eslint-disable class-methods-use-this */
import { Op } from 'sequelize';
import IMatch from '../interfaces/IMatch';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import UnauthorizedError from '../error/UnauthorizedError';
import NotFoundError from '../error/NotFoundError';
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

    if (matches.length === 0) throw new NotFoundError('There is no matches!');

    return matches;
  }

  async create(match: IMatch): Promise<MatchModel> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;

    if (homeTeam === awayTeam) {
      throw new UnauthorizedError('It is not possible to create a match with two equal teams');
    }

    await this.teamService.getById(homeTeam);
    await this.teamService.getById(awayTeam);

    const matchCreated = await MatchModel
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });

    return matchCreated;
  }

  async finish(id: number) {
    if (!(await MatchModel.findByPk(id))) {
      throw new NotFoundError('There is no match with such id!');
    }

    await MatchModel.update({ inProgress: false }, { where: { id } });
  }

  async updateGoals(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    if (!(await MatchModel.findByPk(id))) {
      throw new NotFoundError('There is no match with such id!');
    }

    await MatchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}
