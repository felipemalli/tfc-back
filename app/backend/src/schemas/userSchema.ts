// const errors = {
//   invalidEmailAndPassword: 'Incorrect email or password',
//   emailOrPasswordBlank: 'All fields must be filled',
// };

// const codes = {
//   badRequest: 400,
//   unauthorized: 401,
// };

// const blank = (value:string) => (!value);
// const incorrectFormat = (value:string) => {
//   const regex = /\S+@\S+\.\S+/;
//   return !(regex.test(value));
// };
// const isLengthLessThan = (value:string, min:number) => (value.length < min);

// const validateEmail = (email:string) => {
//   switch (true) {
//     case blank(email):
//       return { code: codes.badRequest, message: errors.emailOrPasswordBlank };
//     case incorrectFormat(email):
//       return { code: codes.unauthorized, message: errors.invalidEmailAndPassword };
//     default: return {};
//   }
// };

// const validatePassword = (password:string) => {
//   switch (true) {
//     case blank(password):
//       return { code: codes.badRequest, message: errors.emailOrPasswordBlank };
//     case isLengthLessThan(password, 6):
//       return { code: codes.unauthorized, message: errors.invalidEmailAndPassword };
//     default: return {};
//   }
// };

// export { validateEmail, validatePassword };
