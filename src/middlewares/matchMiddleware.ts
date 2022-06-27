import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../error/BadRequestError';
import matchVdSchema from '../schemas/matchValidationSchema';

const validTeams = (req:Request, _res:Response, next:NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  switch (true) {
    case matchVdSchema.blank([homeTeam, awayTeam]):
      throw new BadRequestError('All fields must be filled');
    case matchVdSchema.isNotNumber([homeTeam, awayTeam]):
      throw new BadRequestError('There is at least one incorrect value');
    default: next();
  }
};

const validGoals = (req:Request, _res:Response, next:NextFunction) => {
  const { homeTeamGoals, awayTeamGoals } = req.body;

  switch (true) {
    case matchVdSchema.blank([homeTeamGoals, awayTeamGoals]):
      throw new BadRequestError('All fields must be filled');
    case matchVdSchema.isNotNumber([homeTeamGoals, awayTeamGoals]):
      throw new BadRequestError('There is at least one incorrect value');
    default: next();
  }
};

export { validTeams, validGoals };
