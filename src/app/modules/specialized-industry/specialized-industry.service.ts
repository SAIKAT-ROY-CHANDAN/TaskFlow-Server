import { SpecializedIndustry } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { deleteImageFile } from '../../utils/deleteFile';

const createSpecializedIndustryIntoDB = async (
  payload: SpecializedIndustry,
) => {
  const response = await prisma.specializedIndustry.create({
    data: payload,
  });

  return response;
};

const getSpecializedIndustriesFromDB = async (query: Record<string, any>) => {
  const specializedIndustryQuery = builderQuery({
    searchFields: ['name'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const totalIndustries = await prisma.specializedIndustry.count({
    where: specializedIndustryQuery.where,
  });
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalIndustries / specializedIndustryQuery.take);

  const response = await prisma.specializedIndustry.findMany({
    ...specializedIndustryQuery,
    include: { industry: true },
  });

  return {
    meta: {
      totalItems: totalIndustries,
      totalPages,
      currentPage,
    },
    data: response,
  };
};

const getSpecializedIndustryFromDB = async (id: string) => {
  const response = await prisma.specializedIndustry.findUniqueOrThrow({
    where: { id },
  });

  return response;
};

const updateSpecializedIndustryIntoDB = async (
  id: string,
  payload: Partial<SpecializedIndustry>,
) => {
  const existingIndustry = await getSpecializedIndustryFromDB(id);

  const response = await prisma.specializedIndustry.update({
    where: { id },
    data: {
      ...payload,
      icon: payload.icon || existingIndustry.icon,
    },
  });

  if (
    payload.icon &&
    payload.icon !== existingIndustry.icon &&
    existingIndustry.icon
  ) {
    deleteImageFile(existingIndustry.icon);
  }

  return response;
};

const deleteSpecializedIndustryFromDB = async (id: string) => {
  const existingIndustry = await getSpecializedIndustryFromDB(id);

  const response = await prisma.specializedIndustry.delete({
    where: { id },
  });

  if (existingIndustry.icon) {
    deleteImageFile(existingIndustry.icon);
  }

  return response;
};

export const SpecializedIndustryService = {
  createSpecializedIndustryIntoDB,
  getSpecializedIndustriesFromDB,
  getSpecializedIndustryFromDB,
  updateSpecializedIndustryIntoDB,
  deleteSpecializedIndustryFromDB,
};
