export type User = {
  username: string;
  email: string;
  avatar: string;
};

export type RegistedUser = Pick<User, "email" | "username">;

export type CreateUserData = {
  email: string;
  password: string;
};
