import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig';
import UnauthorizedError from '../error/UnauthorizedError';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) throw new UnauthorizedError('Token not found');

  try {
    const SECRET = jwtConfig.secret;
    const decoded = verify(token, SECRET);

    console.log(decoded);

    req.body.authToken = decoded;

    next();
  } catch (_err) {
    throw new UnauthorizedError('Expired or invalid token');
  }
};

export default authMiddleware;
