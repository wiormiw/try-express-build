import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '@config/logger';
import { NotFoundException } from '@exceptions/notFoundException';

import { ApiError } from '@customTypes/api';
import { ConflictException } from '@exceptions/conflictException';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err);

  if (err instanceof ZodError) {
    const apiError: ApiError = {
      type: 'validation_error',
      message: 'Validation error',
      params: err.errors.map((e: any) => e.message),
      // turn into object
    };
    return res.status(400).json(apiError);
  }

  if (err && err.type && err.message) {
    return res.status(400).json(err);
  }

  if (err instanceof NotFoundException) {
    const apiError: ApiError = {
      type: 'not_found',
      message: err.message,
    };
    return res.status(404).json(apiError);
  }

  if (err instanceof ConflictException) {
    const apiError: ApiError = {
      type: 'conflict',
      message: err.message
    };
    return res.status(409).json(apiError);
  }

  if (err instanceof Error) {
    const apiError: ApiError = {
      type: 'internal_error',
      message: err.message,
    };
    return res.status(500).json(apiError);
  }

  const apiError: ApiError = {
    type: 'unknown_error',
    message: 'Unknown error',
  };
  res.status(500).json(apiError);
}
