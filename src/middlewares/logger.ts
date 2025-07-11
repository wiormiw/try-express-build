import { Request, Response, NextFunction } from 'express';
import { logger } from '@config/logger';

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  logger.info({ method: req.method, url: req.url, body: req.body });
  next();
}
