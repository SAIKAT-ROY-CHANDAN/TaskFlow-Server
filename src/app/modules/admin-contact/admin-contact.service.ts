import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createAdminContactIntoDB = async (payload: {
  phone: string;
  email: string;
  address: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  xUrl?: string;
  discordUrl?: string;
  googleMapUrl?: string;
}) => {
  const response = await prisma.adminContact.create({
    data: payload,
  });

  return response;
};

const getAdminContactsFromDB = async (query: Record<string, unknown>) => {
  const adminContactQuery = builderQuery({
    searchFields: ['phone', 'email', 'address'],
    searchTerm: query.searchTerm as string,
    filter: query.filter ? JSON.parse(query.filter as string) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy as string) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const totalAdminContacts = await prisma.adminContact.count({
    where: adminContactQuery.where,
  });
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalAdminContacts / adminContactQuery.take);

  const response = await prisma.adminContact.findMany({
    ...adminContactQuery,
  });

  return {
    meta: {
      totalItems: totalAdminContacts,
      totalPages,
      currentPage,
    },
    data: response,
  };
};

const getAdminContactFromDB = async (id: string) => {
  const response = await prisma.adminContact.findUniqueOrThrow({
    where: { id },
  });

  return response;
};

const updateAdminContactIntoDB = async (
  id: string,
  payload: Partial<{
    phone: string;
    email: string;
    address: string;
    facebookUrl: string;
    linkedinUrl: string;
    instagramUrl: string;
    xUrl: string;
    discordUrl: string;
    googleMapUrl: string;
  }>,
) => {
  const response = await prisma.adminContact.update({
    where: { id },
    data: payload,
  });

  return response;
};

const deleteAdminContactFromDB = async (id: string) => {
  const response = await prisma.adminContact.delete({
    where: { id },
  });

  return response;
};

const getActiveAdminContactFromDB = async () => {
  const response = await prisma.adminContact.findFirst({
    orderBy: { createdAt: 'desc' },
  });

  return response;
};

export const AdminContactServices = {
  createAdminContactIntoDB,
  getAdminContactsFromDB,
  getAdminContactFromDB,
  updateAdminContactIntoDB,
  deleteAdminContactFromDB,
  getActiveAdminContactFromDB,
};
