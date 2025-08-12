import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createContactIntoDB = async (payload: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) => {
  const response = await prisma.contact.create({
    data: payload,
  });

  return response;
};

const getContactsFromDB = async (query: Record<string, unknown>) => {
  const contactQuery = builderQuery({
    searchFields: ['name', 'email', 'subject'],
    searchTerm: query.searchTerm as string,
    filter: query.filter ? JSON.parse(query.filter as string) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy as string) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const totalContacts = await prisma.contact.count({
    where: contactQuery.where,
  });
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalContacts / contactQuery.take);

  const response = await prisma.contact.findMany({
    ...contactQuery,
  });

  return {
    meta: {
      totalItems: totalContacts,
      totalPages,
      currentPage,
    },
    data: response,
  };
};

const getContactFromDB = async (id: string) => {
  const response = await prisma.contact.findUniqueOrThrow({
    where: { id },
  });

  return response;
};

const updateContactIntoDB = async (
  id: string,
  payload: Partial<{
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    isOpened: boolean;
  }>,
) => {
  const response = await prisma.contact.update({
    where: { id },
    data: payload,
  });

  return response;
};

const deleteContactFromDB = async (id: string) => {
  const response = await prisma.contact.delete({
    where: { id },
  });

  return response;
};

const markContactAsOpenedIntoDB = async (id: string) => {
  const response = await prisma.contact.update({
    where: { id },
    data: { isOpened: true },
  });

  return response;
};

export const ContactServices = {
  createContactIntoDB,
  getContactsFromDB,
  getContactFromDB,
  updateContactIntoDB,
  deleteContactFromDB,
  markContactAsOpenedIntoDB,
};
