import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.getAll);
router.post('/', matchController.create);
router.patch('/:id/finish', matchController.finish);

export default router;
