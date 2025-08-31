import prisma from '../../../db/db.config';
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

const getAboutHOmeFromDB = async () => {
  const response = await prisma.aboutHome.findFirstOrThrow({
    include: {
      keyPoints: true,
    },
  });
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

export const AboutHOmeServices = {
  createAboutHomeIntoDB,
  getAboutHOmeFromDB,
  updateAboutHomeIntoDB,
};
