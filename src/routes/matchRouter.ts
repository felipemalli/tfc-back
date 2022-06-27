import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import { validTeams, validGoals } from '../middlewares/matchMiddleware';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.getAll);
router.post('/', validTeams, validGoals, matchController.create);
router.patch('/:id/finish', matchController.finish);
router.patch('/:id', matchController.updateGoals);

export default router;
