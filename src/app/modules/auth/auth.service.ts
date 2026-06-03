import bcrypt from 'bcrypt';
import config from '../../configs';
import AppError from '../../errors/AppError';
import { TLogin, TJwtPayload } from '../../types/auth.type';
import { generateToken } from '../../utils/tokenGenerator';
import prisma from '../../../db/db.config';

const register = async (payload: {
  email: string;
  password: string;
  fullName: string;
  role?: string;
}) => {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new AppError(400, 'User already exists with this email');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(
    payload.password,
    config.password_salt_rounds,
  );

  // Create user
  const user = await prisma.user.create({
    data: {
      email: payload.email,
      password: hashedPassword,
      fullName: payload.fullName,
      role: (payload.role as any) || 'USER',
    },
  });

  // Generate tokens
  const jwtPayload: TJwtPayload = {
    email: user.email,
    name: user.fullName,
    role: user.role,
    id: user.id,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.jwtAccessSecret as string,
    config.jwtAccessExpiresIn as string,
  );

  const refreshToken = generateToken(
    jwtPayload,
    config.jwtRefreshSecret as string,
    config.jwtRefreshExpiresIn as string,
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      avatar: user.avatar,
    },
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

const login = async (payload: TLogin) => {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new AppError(401, 'Invalid email or password');
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordValid) {
    throw new AppError(401, 'Invalid email or password');
  }

  // Generate tokens
  const jwtPayload: TJwtPayload = {
    email: user.email,
    name: user.fullName,
    role: user.role,
    id: user.id,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.jwtAccessSecret as string,
    config.jwtAccessExpiresIn as string,
  );

  const refreshToken = generateToken(
    jwtPayload,
    config.jwtRefreshSecret as string,
    config.jwtRefreshExpiresIn as string,
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      avatar: user.avatar,
    },
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

export const authService = {
  register,
  login,
};
