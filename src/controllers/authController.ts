import { Request, Response, NextFunction } from 'express';
import { UsersService } from '@services/usersService';
import { ApiResponse } from '@customTypes/api';

export class AuthController {
  private readonly usersService: UsersService;
  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }
  public async login(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const result = await this.usersService.login(req.body);
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  }
}
