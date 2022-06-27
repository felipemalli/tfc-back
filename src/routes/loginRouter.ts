import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import authMiddleware from '../middlewares/authMiddleware';
import { validEmail, validPassword } from '../middlewares/userMiddleware';

const router = Router();

const loginController = new LoginController();

router.post('/', validEmail, validPassword, loginController.login);
router.get('/validate', authMiddleware, loginController.validate);

export default router;
