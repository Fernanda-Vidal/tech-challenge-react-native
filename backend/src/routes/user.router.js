import { Router } from 'express';
import userController from '../controllers/userController.js';

const routers = Router();

routers.get('/', userController.getUserController);

export default routers;