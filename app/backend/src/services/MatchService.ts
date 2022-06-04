/* eslint-disable class-methods-use-this */
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

export default class MatchService {
  async getAll(inProgress: boolean | null): Promise<MatchModel[]> {
    let matches;
    if (inProgress) {
      matches = await MatchModel.findAll({ where: { inProgress },
        include: [
          { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
        ] });
    } else {
      matches = await MatchModel.findAll({ include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ] });
    }

    return matches;
  }
}
