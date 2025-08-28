import { DepartmentHead } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { deleteImageFile } from '../../utils/deleteFile';
import bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';

const createDepartmentHeadIntoDB = async (payload: Partial<DepartmentHead>) => {
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 12);
  }

  const response = await prisma.departmentHead.create({
    data: payload as DepartmentHead,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      designation: true,
      linkedinUrl: true,
      facebookUrl: true,
      instagramUrl: true,
      xUrl: true,
      profilePhoto: true,
      roleId: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return response;
};

const getDepartmentHeadsFromDB = async (query: Record<string, unknown>) => {
  const departmentHeadQuery = builderQuery({
    searchFields: ['name', 'email', 'designation'],
    searchTerm: query.searchTerm as string,
    filter: query.filter ? JSON.parse(query.filter as string) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy as string) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const totalDepartmentHeads = await prisma.departmentHead.count({
    where: departmentHeadQuery.where,
  });
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalDepartmentHeads / departmentHeadQuery.take);

  const response = await prisma.departmentHead.findMany({
    ...departmentHeadQuery,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      designation: true,
      linkedinUrl: true,
      facebookUrl: true,
      instagramUrl: true,
      xUrl: true,
      profilePhoto: true,
      roleId: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return {
    meta: {
      totalItems: totalDepartmentHeads,
      totalPages,
      currentPage,
    },
    data: response,
  };
};

const getDepartmentHeadFromDB = async (id: string) => {
  const response = await prisma.departmentHead.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      designation: true,
      linkedinUrl: true,
      facebookUrl: true,
      instagramUrl: true,
      xUrl: true,
      profilePhoto: true,
      roleId: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return response;
};

const updateDepartmentHeadIntoDB = async (
  id: string,
  payload: Partial<DepartmentHead>,
) => {
  const existingDepartmentHead = await prisma.departmentHead.findUniqueOrThrow({
    where: { id },
  });

  // Hash password if provided
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 12);
  }

  const response = await prisma.departmentHead.update({
    where: { id },
    data: {
      ...payload,
      profilePhoto: payload.profilePhoto || existingDepartmentHead.profilePhoto,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      designation: true,
      linkedinUrl: true,
      facebookUrl: true,
      instagramUrl: true,
      xUrl: true,
      profilePhoto: true,
      roleId: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  // Delete old profile photo if new one is uploaded
  if (
    payload.profilePhoto &&
    payload.profilePhoto !== existingDepartmentHead.profilePhoto &&
    existingDepartmentHead.profilePhoto
  ) {
    deleteImageFile(existingDepartmentHead.profilePhoto);
  }

  return response;
};

const deleteDepartmentHeadFromDB = async (
  id: string,
  loggedUser: JwtPayload,
) => {
  const existingDepartmentHead = await prisma.departmentHead.findUniqueOrThrow({
    where: { id },
  });

  if (loggedUser.id === id) {
    throw new AppError(403, 'You cannot delete your own account');
  }

  const response = await prisma.departmentHead.delete({
    where: { id },
  });

  if (existingDepartmentHead.profilePhoto) {
    deleteImageFile(existingDepartmentHead.profilePhoto);
  }

  return response;
};

const getDepartmentHeadsByRoleFromDB = async (roleId: string) => {
  const response = await prisma.departmentHead.findMany({
    where: { roleId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      designation: true,
      linkedinUrl: true,
      facebookUrl: true,
      instagramUrl: true,
      xUrl: true,
      profilePhoto: true,
      roleId: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return response;
};

export const DepartmentHeadServices = {
  createDepartmentHeadIntoDB,
  getDepartmentHeadsFromDB,
  getDepartmentHeadFromDB,
  updateDepartmentHeadIntoDB,
  deleteDepartmentHeadFromDB,
  getDepartmentHeadsByRoleFromDB,
};
