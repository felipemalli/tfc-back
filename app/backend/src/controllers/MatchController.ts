import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/MatchService';

export default class TeamController {
  public matchService = new MatchService();

  constructor() {
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.finish = this.finish.bind(this);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    const { inProgress } = req.query;
    let matches: object[];

    try {
      switch (inProgress) {
        case 'true':
          matches = await this.matchService.getAll(true);
          break;
        case 'false':
          matches = await this.matchService.getAll(false);
          break;
        default: matches = await this.matchService.getAll();
      }

      return res.status(201).json(matches);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;

    const match = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress };

    try {
      const inProgressMatch = await this.matchService.create(match);

      return res.status(200).json(inProgressMatch);
    } catch (err) {
      next(err);
    }
  }

  async finish(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      await this.matchService.finish(Number(id));

      return res.status(200).json({ message: 'Finished' });
    } catch (err) {
      next(err);
    }
  }
}
