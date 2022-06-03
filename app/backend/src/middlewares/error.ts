import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import ErrorBase from '../error/ErrorBase';

const errorMiddleware = (
  err: ErrorRequestHandler,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ErrorBase) {
    return res.status(err._statusCode).json({ message: err.message });
  }

  console.log(err);
  res.status(500).json({ message: 'Internal Server Error' });
};

export default errorMiddleware;
