import { readFileSync } from 'fs';

const secret = readFileSync('jwt.evaluation.key', 'utf8');
const config = { expiresIn: '5d' };

export default { secret, config };
