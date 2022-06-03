// import { NextFunction, Request, Response } from 'express';
// import { validateEmail, validatePassword } from '../schemas/userSchema';

// const validEmail = (req:Request, res:Response, next:NextFunction) => {
//   const { email } = req.body;
//   const validations = validateEmail(email);

//   if (validations.message) {
//     return res.status(validations.code).json({ message: validations.message });
//   }

//   next();
// };

// const validPassword = (req:Request, res:Response, next:NextFunction) => {
//   const { password } = req.body;
//   const validations = validatePassword(password);

//   if (validations.message) {
//     return res.status(validations.code).json({ message: validations.message });
//   }

//   next();
// };

// export { validEmail, validPassword };
