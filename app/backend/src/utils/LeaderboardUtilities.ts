// import { readFileSync } from 'fs';
// import { sign, verify } from 'jsonwebtoken';

// export default class LeaderboardUtilities {
//   private secretKey: string;
//   private token: string;

//   generateToken(user: object | null) {
//     this.secretKey = readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });
//     this.token = sign({ user }, this.secretKey, {
//       algorithm: 'HS256',
//     });
//     return this.token;
//   }

//   decodeToken(token: string) {
//     try {
//       this.secretKey = readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });
//       const decodedToken = verify(token, this.secretKey);
//       return decodedToken;
//     } catch (error) {
//       return false;
//     }
//   }
// }
