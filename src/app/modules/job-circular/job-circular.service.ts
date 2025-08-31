import { JobCircular } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createJobCircularIntoDB = async (payload: Partial<JobCircular>) => {
  const response = await prisma.jobCircular.create({
    data: payload as JobCircular,
  });

  return response;
};

const getJobCircularsFromDB = async (query: Record<string, unknown>) => {
  const jobCircularQuery = builderQuery({
    searchFields: ['jobTitle', 'jobType', 'salary'],
    searchTerm: query.searchTerm as string,
    filter: query.filter ? JSON.parse(query.filter as string) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy as string) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const totalJobCirculars = await prisma.jobCircular.count({
    where: jobCircularQuery.where,
  });
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalJobCirculars / jobCircularQuery.take);

  const response = await prisma.jobCircular.findMany({
    ...jobCircularQuery,
  });

  return {
    meta: {
      totalItems: totalJobCirculars,
      totalPages,
      currentPage,
    },
    data: response,
  };
};

const getJobCircularFromDB = async (id: string) => {
  const response = await prisma.jobCircular.findUniqueOrThrow({
    where: { id },
  });

  return response;
};

const updateJobCircularIntoDB = async (
  id: string,
  payload: Partial<JobCircular>,
) => {
  const response = await prisma.jobCircular.update({
    where: { id },
    data: payload,
  });

  return response;
};

const deleteJobCircularFromDB = async (id: string) => {
  const response = await prisma.jobCircular.delete({
    where: { id },
  });

  return response;
};

export const JobCircularServices = {
  createJobCircularIntoDB,
  getJobCircularsFromDB,
  getJobCircularFromDB,
  updateJobCircularIntoDB,
  deleteJobCircularFromDB,
};
