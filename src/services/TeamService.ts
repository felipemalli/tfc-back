/* eslint-disable class-methods-use-this */
import TeamModel from '../database/models/TeamModel';
import NotFoundError from '../error/NotFoundError';

export default class TeamService {
  async getAll(): Promise<TeamModel[]> {
    const teams = await TeamModel.findAll();

    if (teams.length === 0) throw new NotFoundError('There is no teams!');

    return teams;
  }

  async getById(id: number): Promise<TeamModel> {
    const teamFind = await TeamModel.findByPk(id);

    if (!teamFind) throw new NotFoundError('There is no team with such id!');

    return teamFind;
  }
}
