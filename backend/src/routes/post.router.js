import { Router } from "express";
import postController from "../controllers/postController.js";
import validatePost from "../middlewares/validatePostCreate.js";
import validatePostUpdate from "../middlewares/validatePostUpdate.js";
import validatePostId from "../middlewares/validatePostId.js";

const routers = Router();

// Rotas públicas
routers.get('/', postController.getAllPostsController);
routers.get('/search', postController.searchPostController);
routers.get('/teacher', postController.getAllPostsByTeacherController);
routers.get('/:id', validatePostId, postController.getPostagemByIdController);

// Rotas que requerem autenticação
routers.post('/', validatePost, postController.createPostController);
routers.put('/:id', validatePostUpdate, postController.updatePostByIdController);
routers.delete('/:id', validatePostId, postController.deletePostByIdController);

export default routers;