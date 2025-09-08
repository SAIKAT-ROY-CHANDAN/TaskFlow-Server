import { Industry } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

interface QueryParams {
  searchTerm?: string;
  filter?: string;
  orderBy?: string;
  page?: string;
  limit?: string;
}

const createIndustryIntoDB = async (payload: Industry) => {
  const response = await prisma.industry.create({
    data: payload,
  });

  return response;
};

const getIndustriesFromDB = async (query: QueryParams) => {
  const industryQuery = builderQuery({
    searchFields: ['name', 'slogan'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const totalIndustries = await prisma.industry.count({
    where: industryQuery.where,
  });
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalIndustries / industryQuery.take);

  const response = await prisma.industry.findMany({
    ...industryQuery,
    include: {
      specializedIndustries: true,
    },
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

const getIndustryFromDB = async (id: string) => {
  const response = await prisma.industry.findUniqueOrThrow({
    where: { id },
    include: {
      specializedIndustries: true,
    },
  });

  return response;
};

const updateIndustryInDB = async (id: string, payload: Partial<Industry>) => {
  await prisma.industry.findUniqueOrThrow({ where: { id } });

  const response = await prisma.industry.update({
    where: {
      id,
    },
    data: payload,
  });

  return response;
};

const deleteIndustryInDB = async (id: string) => {
  await prisma.industry.findUniqueOrThrow({ where: { id } });

  const response = await prisma.industry.delete({
    where: {
      id,
    },
  });

  return response;
};

export const IndustryServices = {
  createIndustryIntoDB,
  getIndustriesFromDB,
  getIndustryFromDB,
  updateIndustryInDB,
  deleteIndustryInDB,
};
