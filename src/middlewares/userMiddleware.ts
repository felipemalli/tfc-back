import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../error/BadRequestError';
import UnauthorizedError from '../error/UnauthorizedError';
import userVdSchema from '../schemas/userValidationSchema';

const validEmail = (req:Request, _res:Response, next:NextFunction) => {
  const { email } = req.body;

  switch (true) {
    case userVdSchema.blank(email):
      throw new BadRequestError('All fields must be filled');
    case userVdSchema.incorrectFormat(email):
      throw new UnauthorizedError('Incorrect email or password');
    default: next();
  }
};

const validPassword = (req:Request, res:Response, next:NextFunction) => {
  const { password } = req.body;

  switch (true) {
    case userVdSchema.blank(password):
      throw new BadRequestError('All fields must be filled');
    case userVdSchema.isLengthLessThan(password, 6):
      throw new UnauthorizedError('Incorrect email or password');
    default: next();
  }
};

export { validEmail, validPassword };
