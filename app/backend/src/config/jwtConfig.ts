import { readFileSync } from 'fs';

const secret = readFileSync('jwt.evaluation.key', 'utf8');
const config = { expiresIn: '5d' }; // algorithm: 'HS256'

export default { secret, config };
