import { Invoice, InvoiceItem, PaymentMethod } from '@prisma/client';
import prisma from '../../../db/db.config';
import { generateInvoiceId } from '../../utils/generateInvoiceId';
import { builderQuery } from '../../builders/prismaBuilderQuery';

type MajorInvoice = Invoice & {
  bankName: string;
  accountName: string;
  accountNumber: string;
  branch?: string;
  paymentMethod: PaymentMethod;
  items: InvoiceItem[];
};

const createInvoiceIntoDB = async (payload: MajorInvoice) => {
  const response = await prisma.$transaction(async (prisma) => {
    const invoiceId = await generateInvoiceId();

    const invoiceRes = await prisma.invoice.create({
      data: {
        invoiceId,
        dueDate: payload.dueDate,
        issueDate: payload.issueDate,
        type: payload.type,
        amountPaid: payload.amountPaid,
        notes: payload.notes ? payload.notes : null,
        balanceDue: payload.balanceDue,
        clientId: payload.clientId,
        projectId: payload.projectId,
        discount: payload.discount,
        subtotal: payload.subtotal,
        tax: payload.tax,
        total: payload.total,
      },
    });

    const invoiceItems = await prisma.invoiceItem.createMany({
      data: payload.items.map((item) => ({
        ...item,
        invoiceId: invoiceRes.id,
      })),
    });

    const bankRes = await prisma.bankInfo.create({
      data: {
        bankName: payload.bankName,
        accountName: payload.accountName,
        accountNumber: payload.accountNumber,
        branch: payload.branch,
        paymentMethod: payload.paymentMethod,
        invoiceId: invoiceRes.id,
      },
    });

    return {
      invoice: invoiceRes,
      items: invoiceItems,
      bankInfo: bankRes,
    };
  });

  return response;
};

const getInvoicesFromDB = async (query: Record<string, any>) => {
  const invoicesQuery = builderQuery({
    searchFields: ['invoiceId'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : { createdAt: 'desc' },
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const totalInvoices = await prisma.invoice.count({
    where: invoicesQuery.where,
  });
  const currentPage = Number(query.page) || 1;

  const totalPages = Math.ceil(totalInvoices / invoicesQuery.take);

  const response = await prisma.invoice.findMany({
    ...invoicesQuery,
    include: {
      items: true,
      BankInfo: true,
    },
  });

  return {
    meta: {
      totalItems: totalInvoices,
      totalPages,
      currentPage,
    },
    data: response,
  };
};

const getInvoiceFromDB = async (id: string) => {
  const response = await prisma.invoice.findUniqueOrThrow({
    where: { id },
    include: {
      items: true,
      BankInfo: true,
    },
  });

  return response;
};

const updateInvoiceInDB = async (
  id: string,
  payload: Partial<MajorInvoice>,
) => {
  const response = await prisma.$transaction(async (prisma) => {
    const invoiceRes = await prisma.invoice.update({
      where: { id },
      data: {
        dueDate: payload.dueDate,
        issueDate: payload.issueDate,
        type: payload.type,
        amountPaid: payload.amountPaid,
        notes: payload.notes,
        balanceDue: payload.balanceDue,
        clientId: payload.clientId,
        projectId: payload.projectId,
        discount: payload.discount,
        subtotal: payload.subtotal,
        tax: payload.tax,
        total: payload.total,
      },
    });

    if (payload.items) {
      await prisma.invoiceItem.deleteMany({
        where: { invoiceId: id },
      });

      await prisma.invoiceItem.createMany({
        data: payload.items.map((item) => ({
          ...item,
          invoiceId: id,
        })),
      });
    }

    if (
      payload.bankName ||
      payload.accountName ||
      payload.accountNumber ||
      payload.paymentMethod
    ) {
      await prisma.bankInfo.upsert({
        where: { invoiceId: id },
        update: {
          bankName: payload.bankName,
          accountName: payload.accountName,
          accountNumber: payload.accountNumber,
          branch: payload.branch,
          paymentMethod: payload.paymentMethod,
        },
        create: {
          bankName: payload.bankName!,
          accountName: payload.accountName!,
          accountNumber: payload.accountNumber!,
          branch: payload.branch,
          paymentMethod: payload.paymentMethod!,
          invoiceId: id,
        },
      });
    }

    return invoiceRes;
  });

  return response;
};

const deleteInvoiceFromDB = async (id: string) => {
  const response = await prisma.$transaction(async (prisma) => {
    await prisma.invoiceItem.deleteMany({
      where: { invoiceId: id },
    });

    await prisma.bankInfo.deleteMany({
      where: { invoiceId: id },
    });

    const deletedInvoice = await prisma.invoice.delete({
      where: { id },
    });

    return deletedInvoice;
  });

  return response;
};

const updateInvoiceStatusInDB = async (id: string, status: string) => {
  const response = await prisma.invoice.update({
    where: { id },
    data: { status },
    include: {
      client: true,
      project: true,
      items: true,
      BankInfo: {
        select: {
          id: true,
          bankName: true,
          accountName: true,
          accountNumber: true,
          branch: true,
          paymentMethod: true,
        },
      },
    },
  });

  return response;
};

export {
  createInvoiceIntoDB,
  getInvoicesFromDB,
  getInvoiceFromDB,
  updateInvoiceInDB,
  deleteInvoiceFromDB,
  updateInvoiceStatusInDB,
};
