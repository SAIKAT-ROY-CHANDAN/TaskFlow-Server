import { Technology } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { deleteImageFile } from '../../utils/deleteFile';

const createTechonologyIntoDB = async (payload: Technology) => {
  const response = await prisma.technology.create({
    data: payload,
  });
  return response;
};

const getTechonologyFromDB = async (query: Record<string, any>) => {
  const techonologyQuery = builderQuery({
    searchFields: ['title'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const totalTechonologies = await prisma.technology.count({ where: techonologyQuery.where });
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalTechonologies / techonologyQuery.take);

  const response = await prisma.technology.findMany({
    ...techonologyQuery,
  });

  return {
    meta: {
      totalItems: totalTechonologies,
      totalPages,
      currentPage,
    },
    data: response,
  };
};

const getSingleTechonologyFromDB = async (id: string) => {
  const response = await prisma.technology.findFirst({
    where: { id },
  });

  return response;
};

const updateTechonologyIntoDB = async (
  id: string,
  payload: Technology,
) => {
  const existingTechonology = await prisma.technology.findUniqueOrThrow({
    where: { id },
  });

  const response = await prisma.technology.update({
    where: { id },
    data: {
      ...payload,
      icon: payload.icon || existingTechonology.icon,
      
    },
  });

  if (
    payload.icon &&
    payload.icon !== existingTechonology.icon &&
    existingTechonology.icon
  ) {
    deleteImageFile(existingTechonology.icon);
  }

  return response;
};

const deleteTechonologyFromDB = async (id: string) => {
  const existingTechonology = await prisma.technology.findUniqueOrThrow({
    where: { id },
  });

  const response = await prisma.technology.delete({
    where: { id },
  });

  if (existingTechonology.icon) {
    deleteImageFile(existingTechonology.icon);
  }

  return response;
};

export const TechonologyServices = {
  createTechonologyIntoDB,
  getTechonologyFromDB,
  getSingleTechonologyFromDB,
  updateTechonologyIntoDB,
  deleteTechonologyFromDB,
};
