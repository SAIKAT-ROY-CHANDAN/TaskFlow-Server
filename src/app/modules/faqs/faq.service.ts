
import { Faq } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createFaqsIntoDB = async (payload:Faq) => {
  const response = await prisma.faq.create({
    data: {
      ...payload,
    },
  });

  return response;
};

const getAllFaqsFromDB = async (query: Record<string, any>) => {
  const faqQuery = builderQuery({
    searchFields: ['question', 'answer'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const totalFaqs = await prisma.faq.count({ where: faqQuery.where });
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalFaqs / faqQuery.take);

  const response = await prisma.faq.findMany({
    ...faqQuery,
  });

  return {
    meta: {
      totalItems: totalFaqs,
      totalPages,
      currentPage,
    },
    data: response,
  };
};

const getSingleFaqsFromDB = async (id: string) => {
  const response = await prisma.faq.findUniqueOrThrow({
    where: { id },
  });

  return response;
};

const updateFaqsIntoDB = async (id: string, payload:Faq) => {
  const existingFaq = await prisma.faq.findUniqueOrThrow({
    where: { id },
  });
  if (!existingFaq) {
    throw new Error('Faq not found');
  }

  const response = await prisma.faq.update({
    where: { id },
    data: {
      ...payload,
    },
  });


  return response;
};

const deleteFaqsFromDB = async (id: string) => {
  const existingFaq = await prisma.faq.findUniqueOrThrow({
    where: { id },
  });
  if (!existingFaq) {
    throw new Error('Faq not found');
  }

  const response = await prisma.faq.delete({
    where: { id },
  });


  return response;
};

export const FaqsServices = {
  createFaqsIntoDB,
  getAllFaqsFromDB,
  getSingleFaqsFromDB,
  updateFaqsIntoDB,
  deleteFaqsFromDB,
};
