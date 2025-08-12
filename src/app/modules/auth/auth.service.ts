import prisma from '../../../db/db.config';
import bcrypt from 'bcryptjs';
import { TLogin } from '../../types/auth.type';
import AppError from '../../errors/AppError';
import { generateToken } from '../../utils/tokenGenerator';
import configs from '../../configs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendEmail } from '../../utils/sendEmail';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { deleteImageFile } from '../../utils/deleteFile';
import { DepartmentHead } from '@prisma/client';

const createDepartmentHeadIntoDB = async (payload: DepartmentHead) => {
  const hashedPassword = await bcrypt.hash(payload.password as string, 10);

  const response = await prisma.departmentHead.create({
    data: { ...payload, password: hashedPassword },
  });

  return response;
};

const loginIntoDB = async (payload: TLogin) => {
  const existingAdmin = await prisma.departmentHead.findFirst({
    where: {
      email: payload.email,
    },
    include: {
      role: true,
    },
  });

  if (!existingAdmin) {
    throw new AppError(404, 'Admin user not found with this email');
  }

  const isPasswordMatch = await bcrypt.compare(
    payload.password as string,
    existingAdmin.password as string,
  );

  if (!isPasswordMatch) {
    throw new AppError(401, 'Password is incorrect');
  }

  const jwtPayload = {
    id: existingAdmin.id,
    email: existingAdmin.email,
    name: existingAdmin.name,
    role: existingAdmin.role.name,
    profilePhoto: existingAdmin.profilePhoto,
  };

  const accessToken = generateToken(
    jwtPayload,
    configs.jwtAccessSecret as string,
    configs.jwtAccessExpiresIn as string,
  );

  const refreshToken = generateToken(
    jwtPayload,
    configs.jwtRefreshSecret as string,
    configs.jwtRefreshExpiresIn as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const forgetPasswordIntoDB = async (payload: { email: string }) => {
  const userExists = await prisma.departmentHead.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
    include: {
      role: true,
    },
  });

  if (!userExists) {
    throw new AppError(404, 'User not found');
  }

  const jwtPayload = {
    id: userExists.id,
    email: userExists.email,
    name: userExists.name,
    role: userExists.role.name,
  };

  const accessToken = generateToken(
    jwtPayload,
    configs.jwtAccessSecret as string,
    '1h',
  );

  const resetLink = `${configs.clientUrl}/reset-password/?id=${userExists.id}&accessToken=${accessToken}`;

  sendEmail(resetLink, payload.email);

  return payload.email;
};

const resetPasswordIntoDB = async (
  id: string,
  password: string,
  token: string,
) => {
  const findUser = await prisma.departmentHead.findUnique({
    where: {
      id,
    },
  });

  if (!findUser) {
    throw new AppError(404, 'Department Head not found');
  }

  if (!token) {
    throw new AppError(400, 'Token is required');
  }

  const decoded = jwt.verify(
    token,
    configs.jwtAccessSecret as string,
  ) as JwtPayload;

  if (decoded.id !== findUser.id) {
    throw new AppError(401, 'Invalid token');
  }

  const hashedPassword = await bcrypt.hash(password as string, 10);

  await prisma.departmentHead.update({
    where: {
      id,
    },
    data: {
      password: hashedPassword,
    },
  });

  return 'Password reset successfully';
};

const changePasswordIntoDB = async (
  loggedUser: JwtPayload,
  newPassword: string,
  currentPassword: string,
) => {
  const existingAdmin = await prisma.departmentHead.findUnique({
    where: {
      id: loggedUser.id,
    },
  });

  if (!existingAdmin) {
    throw new AppError(404, 'Department Head not found');
  }

  const isPasswordMatch = await bcrypt.compare(
    currentPassword as string,
    existingAdmin.password as string,
  );

  if (!isPasswordMatch) {
    throw new AppError(500, 'Current password is incorrect');
  }

  const hashedPassword = await bcrypt.hash(newPassword as string, 10);

  const response = await prisma.departmentHead.update({
    where: {
      id: loggedUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  return response;
};

const refreshAccessTokenIntoDB = async (refreshToken: string) => {
  const decoded = jwt.verify(
    refreshToken,
    configs.jwtRefreshSecret as string,
  ) as JwtPayload;

  const jwtPayload = {
    email: decoded.email,
    name: decoded.name,
    role: decoded.role,
    id: decoded.id,
  };

  const newAccessToken = generateToken(
    jwtPayload,
    configs.jwtAccessSecret as string,
    configs.jwtAccessExpiresIn as string,
  );

  return newAccessToken;
};

const getLoggedDepartmentHeadDetailsFromDB = async (user: JwtPayload) => {
  console.log("user", user);
  console.log("hello case 1")
  const response = await prisma.departmentHead.findUniqueOrThrow({
    where: {
      id: user.id,
    },
    include: {
      role: {
        include: {
          roleFeature: {
            orderBy: {
              index: 'asc',
            },
          },
        },
      },
    },
  });

  return response;
};

const updateDepartmentHeadProfileIntoDB = async (
  loggedU: JwtPayload,
  payload: Partial<DepartmentHead>,
) => {
  const existingAdmin = await prisma.departmentHead.findUnique({
    where: {
      id: loggedU.id,
    },
  });

  if (!existingAdmin) {
    throw new AppError(404, 'Department Head not found');
  }

  const response = await prisma.departmentHead.update({
    where: {
      id: loggedU.id,
    },
    data: payload,
  });

  return response;
};

const getDepartmentHeadsFromDB = async (query: Record<string, any>) => {
  const usersQuery = builderQuery({
    searchFields: ['name', 'email'],
    searchTerm: query.searchTerm,
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    filter: query.filter ? JSON.parse(query.filter) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const [users, totalCount] = await prisma.$transaction([
    prisma.departmentHead.findMany({
      where: usersQuery.where,
      include: {
        role: {
          include: {
            roleFeature: true,
          },
        },
      },
    }),
    prisma.departmentHead.count({
      where: usersQuery.where,
    }),
  ]);

  return {
    meta: {
      totalItems: totalCount,
      currentPage: Number(query.page) || 1,
      totalPages: Math.ceil(totalCount / usersQuery.take),
    },
    data: users,
  };
};

const deleteDepartmentHeadFromDB = async (loggedUser: JwtPayload, id: string) => {
  const existingDepartmentHead = await prisma.departmentHead.findUnique({
    where: { id },
  });

  if (existingDepartmentHead?.id === loggedUser.id) {
    throw new AppError(403, 'You cannot delete your own account');
  }

  if (!existingDepartmentHead) {
    throw new AppError(404, 'Department Head not found');
  }

  const response = await prisma.departmentHead.delete({
    where: { id },
  });

  if (existingDepartmentHead.profilePhoto) {
    deleteImageFile(existingDepartmentHead.profilePhoto);
  }

  return response;
};

export const AuthServices = {
  createDepartmentHeadIntoDB,
  loginIntoDB,
  forgetPasswordIntoDB,
  resetPasswordIntoDB,
  changePasswordIntoDB,
  refreshAccessTokenIntoDB,
  getLoggedDepartmentHeadDetailsFromDB,
  updateDepartmentHeadProfileIntoDB,
  getDepartmentHeadsFromDB,
  deleteDepartmentHeadFromDB,
};
