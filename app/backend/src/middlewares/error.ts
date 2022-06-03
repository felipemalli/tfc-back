// // tentando adequar ao TS

// import { Request, Response, NextFunction } from 'express';

// const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
//   if (err._statusCode !== 0) return res.status(err._statusCode).json({ message: err.message });
//   console.log(err);
//   res.status(500).json({ message: 'Internal Server Error' });
// };

// export default errorMiddleware;

// // como era em JS

// const errorMiddleware = (err, _req, res, _next) => {
//   if (err.statusCode) return res.status(err.statusCode).json({ message: err.message });
//   console.log(err);
//   res.status(500).json({ message: 'Internal Server Error' });
// };

// module.exports = errorMiddleware;
