import { Employ } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { deleteImageFile } from '../../utils/deleteFile';

const createEmployIntoDB = async (payload: Partial<Employ>) => {
  const response = await prisma.employ.create({
    data: payload as Employ,
  });

  return response;
};

const getEmploysFromDB = async (query: Record<string, unknown>) => {
  const employQuery = builderQuery({
    searchFields: ['name', 'email', 'designation'],
    searchTerm: query.searchTerm as string,
    filter: query.filter ? JSON.parse(query.filter as string) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy as string) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const totalEmploys = await prisma.employ.count({
    where: employQuery.where,
  });
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalEmploys / employQuery.take);

  const response = await prisma.employ.findMany({
    ...employQuery,
  });

  return {
    meta: {
      totalItems: totalEmploys,
      totalPages,
      currentPage,
    },
    data: response,
  };
};

const getEmployFromDB = async (id: string) => {
  const response = await prisma.employ.findUniqueOrThrow({
    where: { id },
  });

  return response;
};

const updateEmployIntoDB = async (id: string, payload: Partial<Employ>) => {
  const existingEmploy = await prisma.employ.findUniqueOrThrow({
    where: { id },
  });

  const response = await prisma.employ.update({
    where: { id },
    data: {
      ...payload,
      profilePhoto: payload.profilePhoto || existingEmploy.profilePhoto,
    },
  });

  // Delete old profile photo if new one is uploaded
  if (
    payload.profilePhoto &&
    payload.profilePhoto !== existingEmploy.profilePhoto &&
    existingEmploy.profilePhoto
  ) {
    deleteImageFile(existingEmploy.profilePhoto);
  }

  return response;
};

const deleteEmployFromDB = async (id: string) => {
  const existingEmploy = await prisma.employ.findUniqueOrThrow({
    where: { id },
  });

  const response = await prisma.employ.delete({
    where: { id },
  });

  // Delete profile photo if exists
  if (existingEmploy.profilePhoto) {
    deleteImageFile(existingEmploy.profilePhoto);
  }

  return response;
};

export const EmployServices = {
  createEmployIntoDB,
  getEmploysFromDB,
  getEmployFromDB,
  updateEmployIntoDB,
  deleteEmployFromDB,
};
