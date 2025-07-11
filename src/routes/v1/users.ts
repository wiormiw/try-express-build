import { Router } from 'express';
import { UsersController } from '@controllers/usersController';
import { authMiddleware } from '@middlewares/auth';
import { validatePageMeta, validateUserCreate, validateUserId, validateUserUpdate } from '@middlewares/userValidation';

export function createUsersRouter(usersController: UsersController): Router {
  const router = Router();

  router.get('/', authMiddleware, validatePageMeta, usersController.getUsers.bind(usersController));
  router.get('/:id', authMiddleware, validateUserId, usersController.getUserById.bind(usersController));
  router.post('/', validateUserCreate, usersController.createUser.bind(usersController));
  router.put('/:id', authMiddleware, validateUserId, validateUserUpdate, usersController.updateUser.bind(usersController));
  router.delete('/:id', authMiddleware, validateUserId, usersController.deleteUser.bind(usersController));

  return router;
}