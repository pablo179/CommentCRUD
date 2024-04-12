import { Router } from 'express';
import { getComments, createComment, deleteComment, updateComment } from '../controllers/comments.controller.js';

const routes = Router();

routes.get('/', getComments);
routes.post('/', createComment);
routes.delete('/:id', deleteComment);
routes.put('/:id', updateComment);

export default routes;