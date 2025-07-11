export type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
export type UserCreateDTO = Omit<User, 'id'>;
export type UserUpdateDTO = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;
export type UserResponseDTO = Omit<User, 'password'>;

export type LoginDTO = {
  email: string;
  password: string
};
