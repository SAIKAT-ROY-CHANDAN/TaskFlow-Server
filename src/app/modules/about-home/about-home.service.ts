import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { deleteImageFile } from '../../utils/deleteFile';
import { TAboutHome } from '../../types/abouthome.type';


const createAboutHomeIntoDB = async (payload: TAboutHome) => {
  const result = {
    ...payload,
    keyPoints: {
      create: payload.keyPoints ?? [],
    },
  };
  const response = await prisma.aboutHome.create({
    data: result,
  });

  return response;
};

const getAboutHOmeFromDB = async (query: Record<string, unknown>) => {
  const bannerQuery = builderQuery({
    searchFields: ['title', 'subTitle', 'description'],
    searchTerm: query.searchTerm as string,
    filter: query.filter ? JSON.parse(query.filter as string) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy as string) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const totalBanners = await prisma.banner.count({ where: bannerQuery.where });
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalBanners / bannerQuery.take);

  const response = await prisma.banner.findMany({
    ...bannerQuery,
  });

  return {
    meta: {
      totalItems: totalBanners,
      totalPages,
      currentPage,
    },
    data: response,
  };
};

const getSingleAboutHomeFromDB = async () => {
  const response = await prisma.banner.findFirstOrThrow();

  return response;
};

const updateAboutHomeIntoDB = async (payload: TAboutHome) => {
  const existingBanner = await prisma.banner.findFirstOrThrow();
  const result = {
    ...payload,
    keyPoints: {
      create: payload.keyPoints ?? [],
    },
  };
  const response = await prisma.banner.update({
    where: { id: existingBanner.id },
    data: result,
  });

  if (
    payload.sideImage1 &&
    payload.sideImage1 !== existingBanner.sideImage1 &&
    existingBanner.sideImage1
  ) {
    deleteImageFile(existingBanner.sideImage1);
  }
  if (
    payload.sideImage2 &&
    payload.sideImage2 !== existingBanner.sideImage2 &&
    existingBanner.sideImage2
  ) {
    deleteImageFile(existingBanner.sideImage2);
  }

  return response;
};

const deleteAboutHomeFromDB = async (id: string) => {
  const existingBanner = await prisma.banner.findUniqueOrThrow({
    where: { id },
  });

  const response = await prisma.banner.delete({
    where: { id },
  });

  if (existingBanner.sideImage1) {
    deleteImageFile(existingBanner.sideImage1);
  }
  if (existingBanner.sideImage2) {
    deleteImageFile(existingBanner.sideImage2);
  }
  if (existingBanner.logo) {
    deleteImageFile(existingBanner.logo);
  }

  return response;
};

export const AboutHOmeServices = {
  createAboutHomeIntoDB,
  getAboutHOmeFromDB,
  getSingleAboutHomeFromDB,
  updateAboutHomeIntoDB,
  deleteAboutHomeFromDB,
};
