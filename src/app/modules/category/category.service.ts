import { Category } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createCategoryIntoDB = async (payload: Category) => {
  const response = await prisma.category.create({
    data: payload,
  });

  return response;
};

const getCategoriesFromDB = async (query: Record<string, any>) => {
  const categoryQuery = builderQuery({
    searchFields: ['name'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const totalCategories = await prisma.category.count({
    where: categoryQuery.where,
  });
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalCategories / categoryQuery.take);

  const response = await prisma.category.findMany({
    ...categoryQuery,
    include: {
      blogs: true,
      projects: true,
      services: true,
    },
  });

  return {
    meta: {
      totalItems: totalCategories,
      totalPages,
      currentPage,
    },
    data: response,
  };
};

const getCategoryFromDB = async (id: string) => {
  const response = await prisma.category.findUniqueOrThrow({ where: { id } });

  return response;
};

const updateCategoryInDB = async (id: string, payload: Partial<Category>) => {
  await prisma.category.findUniqueOrThrow({ where: { id } });

  const response = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });

  return response;
};

const deleteCategoryInDB = async (id: string) => {
  await prisma.category.findUniqueOrThrow({ where: { id } });

  const response = await prisma.category.delete({
    where: {
      id,
    },
  });

  return response;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getCategoriesFromDB,
  getCategoryFromDB,
  updateCategoryInDB,
  deleteCategoryInDB,
};
