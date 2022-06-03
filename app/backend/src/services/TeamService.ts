/* eslint-disable class-methods-use-this */
import TeamsModel from '../database/models/TeamsModel';
import NotFound from '../error/NotFoundError';

export default class TeamService {
  async getAll(): Promise<TeamsModel[]> {
    const teams = await TeamsModel.findAll();

    if (!teams) throw new NotFound();

    return teams;
  }

  async getById(id: number): Promise<TeamsModel> {
    const teamFind = await TeamsModel.findOne({ where: { id } });

    if (!teamFind) throw new NotFound();

    return teamFind;
  }
}
