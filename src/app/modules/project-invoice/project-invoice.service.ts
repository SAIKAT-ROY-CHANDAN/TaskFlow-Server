import { ProjectInvoice } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createProjectInvoiceIntoDB = async (
  payload: Omit<ProjectInvoice, 'id' | 'createdAt' | 'updatedAt'>,
) => {
  const response = await prisma.projectInvoice.create({
    data: payload,
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return response;
};

const getProjectInvoicesFromDB = async (query: Record<string, unknown>) => {
  const projectInvoiceQuery = builderQuery({
    searchFields: ['name', 'message'],
    searchTerm: query.searchTerm as string,
    filter: query.filter ? JSON.parse(query.filter as string) : {},
    orderBy: query.orderBy
      ? JSON.parse(query.orderBy as string)
      : { createdAt: 'desc' },
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const totalProjectInvoices = await prisma.projectInvoice.count({
    where: projectInvoiceQuery.where,
  });
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalProjectInvoices / projectInvoiceQuery.take);

  const response = await prisma.projectInvoice.findMany({
    ...projectInvoiceQuery,
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      Invoice: {
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
          Invoice: true,
        },
      },
    },
  });

  return {
    meta: {
      totalItems: totalProjectInvoices,
      totalPages,
      currentPage,
    },
    data: response,
  };
};

const getProjectInvoiceFromDB = async (id: string) => {
  const response = await prisma.projectInvoice.findUniqueOrThrow({
    where: { id },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          address: true,
        },
      },
      Invoice: {
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
          notes: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      _count: {
        select: {
          Invoice: true,
        },
      },
    },
  });

  return response;
};

const updateProjectInvoiceInDB = async (
  id: string,
  payload: Partial<Omit<ProjectInvoice, 'id' | 'createdAt' | 'updatedAt'>>,
) => {
  await prisma.projectInvoice.findUniqueOrThrow({ where: { id } });

  const response = await prisma.projectInvoice.update({
    where: {
      id,
    },
    data: payload,
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return response;
};

const deleteProjectInvoiceFromDB = async (id: string) => {
  await prisma.projectInvoice.findUniqueOrThrow({ where: { id } });

  const response = await prisma.projectInvoice.delete({
    where: {
      id,
    },
  });

  return response;
};

export const ProjectInvoiceServices = {
  createProjectInvoiceIntoDB,
  getProjectInvoicesFromDB,
  getProjectInvoiceFromDB,
  updateProjectInvoiceInDB,
  deleteProjectInvoiceFromDB,
};
