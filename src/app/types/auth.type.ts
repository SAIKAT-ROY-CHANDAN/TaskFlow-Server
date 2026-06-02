export type TRegister = {
  email: string;
  password: string;
  fullName: string;
  role?: string;
};

export type TLogin = {
  email: string;
  password: string;
};

export type TJwtPayload = {
  email: string;
  name: string;
  role: string;
  id?: string;
};

export type TUser = {
  id: string;
  email: string;
  fullName: string;
  role: string;
  avatar: string | null;
};
