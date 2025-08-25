import { Banner } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { deleteImageFile } from '../../utils/deleteFile';

type BannerMajor = Banner;

const createBannerIntoDB = async (payload: BannerMajor) => {
  const response = await prisma.banner.create({
    data: payload,
  });

  return response;
};

const getBannersFromDB = async (query: Record<string, unknown>) => {
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

const getBannerFromDB = async () => {
  const response = await prisma.banner.findFirstOrThrow();

  return response;
};

const updateBannerIntoDB = async (payload: Partial<BannerMajor>) => {
  const existingBanner = await prisma.banner.findFirstOrThrow();
  const response = await prisma.banner.update({
    where: { id: existingBanner.id },
    data: payload,
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
  if (
    payload.logo &&
    payload.logo !== existingBanner.logo &&
    existingBanner.logo
  ) {
    deleteImageFile(existingBanner.logo);
  }

  return response;
};

const deleteBannerFromDB = async (id: string) => {
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

export const BannerServices = {
  createBannerIntoDB,
  getBannersFromDB,
  getBannerFromDB,
  updateBannerIntoDB,
  deleteBannerFromDB,
};
