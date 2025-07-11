export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your_jwt_secret',
  expiresIn: Number(process.env.JWT_EXPIRES_IN) || 600, // seconds (10 minutes)
  refreshExpiresIn: Number(process.env.JWT_REFRESH_EXPIRES_IN) || 86400, // seconds (1 days)
};
