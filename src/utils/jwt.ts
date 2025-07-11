import jwt from 'jsonwebtoken';
import { jwtConfig } from '@config/jwt';

import type { AccessTokenPayload, RefreshTokenPayload } from '@customTypes/jwt';

export function generateTokens(payload: AccessTokenPayload) {
  const accessPayload: AccessTokenPayload = { id: payload.id, email: payload.email };
  const refreshPayload: RefreshTokenPayload = { id: payload.id };
  const token = jwt.sign(accessPayload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
  const refreshToken = jwt.sign(refreshPayload, jwtConfig.secret, { expiresIn: jwtConfig.refreshExpiresIn });
  return {
    token,
    expiresIn: jwtConfig.expiresIn.toString(),
    refreshToken,
  };
}
