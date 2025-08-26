import { Service, ServiceOfferKeyPoint } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { deleteImageFile } from '../../utils/deleteFile';

type ServiceWithKeyPoints = Service & {
  serviceOfferKeyPoints?: ServiceOfferKeyPoint[];
};

const createServiceIntoDB = async (payload: ServiceWithKeyPoints) => {
  const { serviceOfferKeyPoints, ...serviceData } = payload;

  const response = await prisma.service.create({
    data: {
      ...serviceData,
      serviceOfferKeyPoints: {
        create: serviceOfferKeyPoints?.map((point) => ({
          point: point.point,
        })),
      },
    },
    include: {
      category: true,
      serviceOfferKeyPoints: true,
    },
  });

  return response;
};

const getServicesFromDB = async (query: Record<string, unknown>) => {
  const serviceQuery = builderQuery({
    searchFields: ['title', 'description'],
    searchTerm: query.searchTerm as string,
    filter: query.filter ? JSON.parse(query.filter as string) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy as string) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const totalServices = await prisma.service.count({
    where: serviceQuery.where,
  });
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalServices / serviceQuery.take);

  const response = await prisma.service.findMany({
    ...serviceQuery,
    include: {
      category: true,
      serviceOfferKeyPoints: true,
    },
  });

  return {
    meta: {
      totalItems: totalServices,
      totalPages,
      currentPage,
    },
    data: response,
  };
};

const getServiceFromDB = async (id: string) => {
  const response = await prisma.service.findUniqueOrThrow({
    where: { id },
    include: {
      category: true,
      serviceOfferKeyPoints: true,
    },
  });

  return response;
};

const updateServiceIntoDB = async (
  id: string,
  payload: Partial<ServiceWithKeyPoints>,
) => {
  const existingService = await prisma.service.findUniqueOrThrow({
    where: { id },
  });

  const { serviceOfferKeyPoints, ...serviceData } = payload;

  // Handle image deletion if new thumbnails are provided
  if (serviceData.thumbnail && existingService.thumbnail) {
    deleteImageFile(existingService.thumbnail);
  }
  if (serviceData.thumbnailOptional1 && existingService.thumbnailOptional1) {
    deleteImageFile(existingService.thumbnailOptional1);
  }
  if (serviceData.thumbnailOptional2 && existingService.thumbnailOptional2) {
    deleteImageFile(existingService.thumbnailOptional2);
  }

  const response = await prisma.service.update({
    where: { id },
    data: {
      ...serviceData,
      serviceOfferKeyPoints: serviceOfferKeyPoints
        ? {
            deleteMany: {},
            create: serviceOfferKeyPoints.map((point) => ({
              point: point.point,
            })),
          }
        : undefined,
    },
    include: {
      category: true,
      serviceOfferKeyPoints: true,
    },
  });

  return response;
};

const deleteServiceFromDB = async (id: string) => {
  const existingService = await prisma.service.findUniqueOrThrow({
    where: { id },
  });

  // Delete associated images
  if (existingService.thumbnail) {
    deleteImageFile(existingService.thumbnail);
  }
  if (existingService.thumbnailOptional1) {
    deleteImageFile(existingService.thumbnailOptional1);
  }
  if (existingService.thumbnailOptional2) {
    deleteImageFile(existingService.thumbnailOptional2);
  }

  const response = await prisma.service.delete({
    where: { id },
  });

  return response;
};

export const ServiceServices = {
  createServiceIntoDB,
  getServicesFromDB,
  getServiceFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
};
