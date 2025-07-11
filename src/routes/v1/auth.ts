import { Router } from 'express';
import { AuthController } from '@controllers/authController';
import { validateLogin } from '@middlewares/userValidation';

export function createAuthRouter(authController: AuthController): Router {
    const router = Router();

    router.post('/login', validateLogin, authController.login.bind(authController));

    return router;
}