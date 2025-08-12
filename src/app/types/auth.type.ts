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
