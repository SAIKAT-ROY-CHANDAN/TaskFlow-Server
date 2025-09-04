import prisma from '../../../db/db.config';
import { deleteImageFile } from '../../utils/deleteFile';
import { TAboutHome } from '../../types/abouthome.type';

const createAboutHomeIntoDB = async (payload: TAboutHome) => {
  const response = await prisma.aboutHome.create({
    data: {
      ...payload,
      keyPoints: {
        create: payload.keyPoints.map((point) => ({
          point: point.point,
        })),
      },
    },
  });

  return response;
};

const getAboutHOmeFromDB = async () => {
  const response = await prisma.aboutHome.findFirst({
    include: {
      keyPoints: true,
    },
  });
  return response;
};

const updateAboutHomeIntoDB = async (payload: TAboutHome) => {
  const existingAboutHome = await prisma.aboutHome.findFirstOrThrow();

  const existingKeyPoints = payload.keyPoints?.filter((kp) => kp.id);
  const newKeyPoints = payload.keyPoints?.filter((kp) => !kp.id);

  // Delete keyPoints that are removed
  await prisma.aboutHomeKeyPoint.deleteMany({
    where: {
      aboutHomeId: existingAboutHome.id,
      id: { notIn: existingKeyPoints?.map((kp) => kp.id) ?? [] },
    },
  });

  // Update AboutHome
  const response = await prisma.aboutHome.update({
    where: { id: existingAboutHome.id },
    data: {
      title: payload.title,
      description: payload.description,
      numberOfProjects: payload.numberOfProjects,
      numberOfClients: payload.numberOfClients,
      sideImage1: payload.sideImage1 ?? null,
      sideImage2: payload.sideImage2 ?? null,

      keyPoints: {
        ...(existingKeyPoints?.length && {
          updateMany: existingKeyPoints.map((kp) => ({
            where: { id: kp.id },
            data: { point: kp.point },
          })),
        }),
        ...(newKeyPoints?.length && {
          create: newKeyPoints.map((kp) => ({ point: kp.point })),
        }),
      },
    },
    include: { keyPoints: true },
  });

  // Cleanup images if replaced
  if (
    payload.sideImage1 &&
    payload.sideImage1 !== existingAboutHome.sideImage1 &&
    existingAboutHome.sideImage1
  ) {
    deleteImageFile(existingAboutHome.sideImage1);
  }

  if (
    payload.sideImage2 &&
    payload.sideImage2 !== existingAboutHome.sideImage2 &&
    existingAboutHome.sideImage2
  ) {
    deleteImageFile(existingAboutHome.sideImage2);
  }

  return response;
};

export const AboutHOmeServices = {
  createAboutHomeIntoDB,
  getAboutHOmeFromDB,
  updateAboutHomeIntoDB,
};
