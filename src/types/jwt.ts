export type AccessTokenPayload = {
  id: number;
  email: string;
};

export type RefreshTokenPayload = Pick<AccessTokenPayload, "id">
