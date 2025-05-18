import { Router } from 'express';
import userController from '../controllers/userController.js';

const routers = Router();

routers.get('/', userController.getUserController);
routers.get('/role/:role', userController.getUserByRoleController);
routers.post('/', userController.createUserController);

export default routers;