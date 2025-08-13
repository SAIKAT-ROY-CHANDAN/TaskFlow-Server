import { Category } from '@prisma/client';
import prisma from '../../../db/db.config';

const createCategoryIntoDB = async (payload: Category) => {
  const response = await prisma.category.create({
    data: payload,
  });

  return response;
};

const getCategoriesFromDB = async () => {
  const response = await prisma.category.findMany();

  return response;
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
