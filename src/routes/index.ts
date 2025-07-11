import { Router } from 'express';

import { UsersService } from '@services/usersService';
import { UsersController } from '@controllers/usersController';
import { AuthController } from '@controllers/authController';
import { db } from '@db/connection';
import { redis } from '@config/redis';
import bcrypt from 'bcryptjs';

import { createUsersRouter } from '@routes/v1/users';
import { createAuthRouter } from '@routes/v1/auth';

export function createV1Router(): Router {
    const routerV1 = Router();

    // Service
    const usersService = new UsersService({ db, redis, bcrypt });

    // Controller
    const authController = new AuthController(usersService);
    const usersController = new UsersController(usersService);

    // Router
    const authRouter = createAuthRouter(authController);
    const usersRouter = createUsersRouter(usersController);

    routerV1.get('/health', (req, res) => res.status(200).json({ status: 'ok', uptime: process.uptime() }));
    routerV1.use('/auth', authRouter);
    routerV1.use('/users', usersRouter);

    return routerV1;
}