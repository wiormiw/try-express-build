import { z } from 'zod';
import { pageMetaSchema } from '@middlewares/userValidation';

export type ApiResponse<T = any> = { data: T };

export type PaginatedResponse<T = any> = {
  data: T[];
  page: number;
  limit: number;
  total: number;
};
export type PageMeta = z.infer<typeof pageMetaSchema>;

export type ApiError = {
  type: string;
  message: string;
  params?: string | string[];
};

export type CreateUserResponse = { id: number };
export type AuthTokensResponse = {
  token: string;
  expiresIn: string;
  refreshToken: string;
};