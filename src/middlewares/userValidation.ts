import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const userCreateSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().min(0),
  password: z.string().min(6)
});

const userUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  age: z.number().int().min(0).optional(),
  password: z.string().min(6).optional()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const idSchema = z.object({
  id: z.string().regex(/^\d+$/)
});

export const pageMetaSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).default(10),
});

export function validateUserCreate(req: Request, res: Response, next: NextFunction) {
  try {
    req.body = userCreateSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
}

export function validateUserUpdate(req: Request, res: Response, next: NextFunction) {
  try {
    req.body = userUpdateSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
}

export function validateLogin(req: Request, res: Response, next: NextFunction) {
  try {
    req.body = loginSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
}

export function validateUserId(req: Request, res: Response, next: NextFunction) {
  try {
    req.params = idSchema.parse(req.params);
    next();
  } catch (err) {
    next(err);
  }
}

export function validatePageMeta(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = pageMetaSchema.parse(req.query);
    res.locals.pageMeta = parsed;
    next();
  } catch (err) {
    next(err);
  }
}