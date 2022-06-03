import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  public teamService = new TeamService();

  constructor() {
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.teamService.getAll();

      return res.status(200).json(teams);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const teamById = await this.teamService.getById(Number(id));

      return res.status(200).json(teamById);
    } catch (err) {
      next(err);
    }
  }
}
