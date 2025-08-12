import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';

const createSubscriberIntoDB = async (payload: { email: string }) => {
  const response = await prisma.subscriber.create({
    data: payload,
  });

  return response;
};

const getSubscribersFromDB = async (query: Record<string, unknown>) => {
  const subscriberQuery = builderQuery({
    searchFields: ['email'],
    searchTerm: query.searchTerm as string,
    filter: query.filter ? JSON.parse(query.filter as string) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy as string) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const totalSubscribers = await prisma.subscriber.count({
    where: subscriberQuery.where,
  });
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalSubscribers / subscriberQuery.take);

  const response = await prisma.subscriber.findMany({
    ...subscriberQuery,
  });

  return {
    meta: {
      totalItems: totalSubscribers,
      totalPages,
      currentPage,
    },
    data: response,
  };
};

const getSubscriberFromDB = async (id: string) => {
  const response = await prisma.subscriber.findUniqueOrThrow({
    where: { id },
  });

  return response;
};

const updateSubscriberIntoDB = async (
  id: string,
  payload: Partial<{ email: string }>,
) => {
  const response = await prisma.subscriber.update({
    where: { id },
    data: payload,
  });

  return response;
};

const deleteSubscriberFromDB = async (id: string) => {
  const response = await prisma.subscriber.delete({
    where: { id },
  });

  return response;
};

const unsubscribeByEmailFromDB = async (email: string) => {
  const response = await prisma.subscriber.delete({
    where: { email },
  });

  return response;
};

export const SubscriberServices = {
  createSubscriberIntoDB,
  getSubscribersFromDB,
  getSubscriberFromDB,
  updateSubscriberIntoDB,
  deleteSubscriberFromDB,
  unsubscribeByEmailFromDB,
};
