import { Router } from 'express';
import LoginController from '../controllers/LoginController';
// import authMiddleware from '../middlewares/authMiddleware';
// import errorMiddleware from './src/middlewares/error';

const router = Router();

const loginController = new LoginController();

router.post('/', loginController.login);

export default router;
