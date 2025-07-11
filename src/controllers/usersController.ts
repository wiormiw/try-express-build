import type { Request, Response, NextFunction } from 'express';
import { UsersService } from '@services/usersService';
import type { ApiResponse, PaginatedResponse } from '@customTypes/api';

export class UsersController {
  private readonly usersService: UsersService;
  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  public async getUsers(
    req: Request,
    res: Response<PaginatedResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { page, limit } = res.locals.pageMeta;
      const result = await this.usersService.getUsers({ page, limit });
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  public async getUserById(
    req: Request,
    res: Response<ApiResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = Number(req.params.id);
      const result = await this.usersService.getUserById(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  public async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await this.usersService.createUser(req.body);
      res.status(201).json(result);
    } catch (err: any) {
      if (err && err.type === 'conflict') {
        res.status(409).json(err);
      }
      next(err);
    }
  }

  public async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = Number(req.params.id);
      await this.usersService.updateUser(id, req.body);
      res.json({});
    } catch (err) {
      next(err);
    }
  }

  public async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = Number(req.params.id);
      await this.usersService.deleteUser(id);
      res.json({});
    } catch (err) {
      next(err);
    }
  }
}
