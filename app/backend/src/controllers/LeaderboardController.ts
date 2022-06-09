import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class TeamController {
  public leaderboardService = new LeaderboardService();

  constructor() {
    this.getAllHome = this.getAllHome.bind(this);
    this.getAllAway = this.getAllAway.bind(this);
  }

  async getAllHome(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderboardHome = await this.leaderboardService.getAllHome();

      return res.status(200).json(leaderboardHome);
    } catch (err) {
      next(err);
    }
  }

  async getAllAway(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderboardAway = await this.leaderboardService.getAllAway();

      return res.status(200).json(leaderboardAway);
    } catch (err) {
      next(err);
    }
  }
}
