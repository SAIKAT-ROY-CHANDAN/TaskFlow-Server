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
  const existingAboutHome = await prisma.aboutHome.findFirstOrThrow();

  // Collect ids from payload (only existing ones)
  const payloadIds = payload.keyPoints
    ?.filter((kp) => kp.id)
    .map((kp) => kp.id) ?? [];

  // Step 1: Delete keyPoints that are in DB but not in payload
  await prisma.aboutHomeKeyPoint.deleteMany({
    where: {
      aboutHomeId: existingAboutHome.id,
      id: { notIn: payloadIds },
    },
  });

  // Step 2: Update AboutHome + upsert keyPoints
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
        upsert: payload.keyPoints?.map((kp) => ({
          where: { id: kp.id ?? "" },
          create: { point: kp.point },
          update: { point: kp.point },
        })) ?? [],
      },
    },
    include: { keyPoints: true }, // return with updated keyPoints
  });

  // cleanup images if changed
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
