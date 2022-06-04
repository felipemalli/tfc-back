/* eslint-disable class-methods-use-this */
import TeamModel from '../database/models/TeamModel';
import NotFound from '../error/NotFoundError';

export default class TeamService {
  async getAll(): Promise<TeamModel[]> {
    const teams = await TeamModel.findAll();

    if (!teams) throw new NotFound();

    return teams;
  }

  async getById(id: number): Promise<TeamModel> {
    const teamFind = await TeamModel.findOne({ where: { id } });

    if (!teamFind) throw new NotFound();

    return teamFind;
  }
}
