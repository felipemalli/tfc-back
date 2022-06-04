import { Router } from 'express';
import loginRouter from './loginRouter';
import teamRouter from './teamRouter';
import matchRouter from './matchRouter';

const router = Router();

router.use('/login', loginRouter);
router.use('/teams', teamRouter);
router.use('/matches', matchRouter);

export default router;
