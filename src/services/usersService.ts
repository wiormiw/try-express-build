import { users } from '@db/schema';
import { eq, count, sql } from 'drizzle-orm';
import { ApiResponse, PaginatedResponse, CreateUserResponse, AuthTokensResponse, PageMeta } from '@customTypes/api';
import { hashPassword } from '@utils/hash';
import { generateTokens } from '@utils/jwt';
import { UserCreateDTO, UserUpdateDTO, LoginDTO, UserResponseDTO } from '@customTypes/user';
import { NotFoundException } from '@exceptions/notFoundException';
import { ConflictException } from '@exceptions/conflictException';
import Redis from 'ioredis';
import { DBType } from '@db/connection';

export class UsersService {
  private readonly db: DBType;
  private readonly redis: Redis;
  private readonly bcrypt: typeof import('bcryptjs');
  private readonly USERS_CACHE_KEY = 'users:all';
  private readonly USERS_CACHE_TTL = 60; // default set to 60 (1 min)
  private USER_CACHE_KEY = (id: number) => `users:${id}`;

  constructor({ db, redis, bcrypt }: any) {
    this.db = db;
    this.redis = redis;
    this.bcrypt = bcrypt;
  }

  public async getUsers({ page, limit }: PageMeta): Promise<PaginatedResponse<UserResponseDTO>> {
    const cacheKey = `${this.USERS_CACHE_KEY}:page=${page}:limit=${limit}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const offset = (page - 1) * limit;

    const [result, countQueryResult] = await Promise.all([
      this.db.select().from(users).limit(limit).offset(offset),
      this.db.select({ count: count(users.id) }).from(users),
    ]);

    const totalCount = Number(countQueryResult[0]?.count ?? 0);
    const userResponses: UserResponseDTO[] = result.map(this.toUserResponseDTO);

    const response = { data: userResponses, page, limit, total: totalCount };

    await this.redis.set(cacheKey, JSON.stringify(response), 'EX', this.USERS_CACHE_TTL);
    return response;
  }


  public async getUserById(id: number): Promise<ApiResponse<UserResponseDTO>> {
    const cacheKey = this.USER_CACHE_KEY(id);
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
    const user = await this.db.query.users.findFirst({ 
      where: (u: any, { eq }: any) => eq(u.id, id)
    });
    if (!user) throw new NotFoundException('User not found');
    const userResponse = this.toUserResponseDTO(user);
    await this.redis.set(cacheKey, JSON.stringify({ data: userResponse }), 'EX', this.USERS_CACHE_TTL);
    return { data: userResponse };
  }

  public async createUser(dto: UserCreateDTO): Promise<CreateUserResponse> {
    const existing = await this.db.query.users.findFirst({ where: (u: any, { eq }: any) => eq(u.email, dto.email) });
    if (existing) throw new ConflictException('email', 'Email already used');
    const hashed = await hashPassword(dto.password);
    const [user] = await this.db.insert(users).values({ ...dto, password: hashed }).returning();
    await this.redis.del(this.USERS_CACHE_KEY);
    return { id: user.id };
  }

  public async updateUser(id: number, dto: UserUpdateDTO): Promise<void> {
    const updatePayload: Record<string, any> = {
      updatedAt: sql`NOW()`,
    };

    if (dto.name !== undefined) {
      updatePayload.name = dto.name;
    }
    if (dto.email !== undefined) {
      const existing = await this.db.query.users.findFirst({ where: (u: any, { eq }: any) => eq(u.email, dto.email) });
      if (existing && existing.id !== id) throw new ConflictException('email', 'Email already used');
      updatePayload.email = dto.email;
    }
    if (dto.age !== undefined) {
      updatePayload.age = dto.age;
    }
  
    if (dto.password !== undefined) {
      updatePayload.password = await hashPassword(dto.password);
    }

    const [user] = await this.db.update(users)
      .set(updatePayload)
      .where(eq(users.id, id))
      .returning();
    if (!user) throw new NotFoundException('User not found');
    await this.redis.del(this.USERS_CACHE_KEY);
    await this.redis.del(this.USER_CACHE_KEY(id));
  }

  public async deleteUser(id: number): Promise<void> {
    const [user] = await this.db.delete(users).where(eq(users.id, id)).returning();
    if (!user) throw new NotFoundException('User not found');
    await this.redis.del(this.USERS_CACHE_KEY);
    await this.redis.del(this.USER_CACHE_KEY(id));
  }

  public async login(dto: LoginDTO): Promise<AuthTokensResponse> {
    const user = await this.db.query.users.findFirst({ where: (u: any, { eq }: any) => eq(u.email, dto.email) });
    if (!user) throw new Error('Invalid credentials');
    const valid = await this.bcrypt.compare(dto.password, user.password);
    if (!valid) throw new Error('Invalid credentials');
    return generateTokens({ id: user.id, email: user.email });
  }

  private toUserResponseDTO(user: any): UserResponseDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }  
}
