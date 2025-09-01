import { Client } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createClientIntoDB = async (
  payload: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>,
) => {
  const response = await prisma.client.create({
    data: payload,
  });

  return response;
};

const getClientsFromDB = async (query: Record<string, any>) => {
  const clientQuery = builderQuery({
    searchFields: ['name', 'email', 'phone', 'address'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : { createdAt: 'desc' },
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const totalClients = await prisma.client.count({
    where: clientQuery.where,
  });
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalClients / clientQuery.take);

  const response = await prisma.client.findMany({
    ...clientQuery,
    include: {
      projectInvoices: {
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      },
      invoices: {
        select: {
          id: true,
          invoiceId: true,
          type: true,
          status: true,
          total: true,
          createdAt: true,
        },
      },
      _count: {
        select: {
          projectInvoices: true,
          invoices: true,
        },
      },
    },
  });

  return {
    meta: {
      totalItems: totalClients,
      totalPages,
      currentPage,
    },
    data: response,
  };
};

const getClientFromDB = async (id: string) => {
  const response = await prisma.client.findUniqueOrThrow({
    where: { id },
    include: {
      projectInvoices: {
        select: {
          id: true,
          name: true,
          message: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      invoices: {
        select: {
          id: true,
          invoiceId: true,
          type: true,
          status: true,
          issueDate: true,
          dueDate: true,
          subtotal: true,
          tax: true,
          discount: true,
          total: true,
          amountPaid: true,
          balanceDue: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      _count: {
        select: {
          projectInvoices: true,
          invoices: true,
        },
      },
    },
  });

  return response;
};

const updateClientInDB = async (
  id: string,
  payload: Partial<Omit<Client, 'id' | 'createdAt' | 'updatedAt'>>,
) => {
  await prisma.client.findUniqueOrThrow({ where: { id } });

  const response = await prisma.client.update({
    where: {
      id,
    },
    data: payload,
  });

  return response;
};

const deleteClientFromDB = async (id: string) => {
  await prisma.client.findUniqueOrThrow({ where: { id } });

  const response = await prisma.client.delete({
    where: {
      id,
    },
  });

  return response;
};


export const ClientServices = {
  createClientIntoDB,
  getClientsFromDB,
  getClientFromDB,
  updateClientInDB,
  deleteClientFromDB
};
