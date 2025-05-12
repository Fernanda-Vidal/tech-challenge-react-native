import { Router } from 'express';
import { loginUser } from '../controllers/authController.js';
import validateLogin from '../middlewares/validateLogin.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/:userType/login', validateLogin, authMiddleware, loginUser);

export default router; 