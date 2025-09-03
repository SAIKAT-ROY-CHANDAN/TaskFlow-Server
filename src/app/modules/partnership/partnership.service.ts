import { Partnership } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { deleteImageFile } from '../../utils/deleteFile';

const createPartnershipIntoDB = async (payload: Partnership) => {
  const response = await prisma.partnership.create({
    data: payload,
  });

  return response;
};

const getPartnershipsFromDB = async (query: Record<string, any>) => {
  const partnershipsQuery = builderQuery({
    searchFields: ['brandName'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const totalItems = await prisma.partnership.count({
    where: partnershipsQuery.where,
  });
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalItems / partnershipsQuery.take);

  const response = await prisma.partnership.findMany({
    ...partnershipsQuery,
  });

  return {
    meta: {
      totalItems: totalItems,
      totalPages,
      currentPage,
    },
    data: response,
  };
};

const getPartnershipFromDB = async (id: string) => {
  const response = await prisma.partnership.findUniqueOrThrow({
    where: { id },
  });

  return response;
};

const updatePartnershipIntoDB = async (
  id: string,
  payload: Partial<Partnership>,
) => {
  const existingPartnership = await getPartnershipFromDB(id);

  const response = await prisma.partnership.update({
    where: { id },
    data: payload,
  });

  if (
    payload.logo &&
    payload.logo !== existingPartnership.logo &&
    existingPartnership.logo
  ) {
    deleteImageFile(existingPartnership.logo);
  }

  return response;
};

const deletePartnershipIntoDB = async (id: string) => {
  const existingPartnership = await getPartnershipFromDB(id);

  const response = await prisma.partnership.delete({
    where: { id },
  });

  if (existingPartnership.logo) {
    deleteImageFile((existingPartnership as any).logo);
  }

  return response;
};

export const PartnershipServices = {
  createPartnershipIntoDB,
  getPartnershipsFromDB,
  getPartnershipFromDB,
  updatePartnershipIntoDB,
  deletePartnershipIntoDB,
};
