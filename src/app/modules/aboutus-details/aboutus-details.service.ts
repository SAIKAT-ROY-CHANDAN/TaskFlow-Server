import { AboutDetails } from '@prisma/client';
import prisma from '../../../db/db.config';

const createAboutUsDetailsIntoDB = async (payload: AboutDetails) => {
  const response = await prisma.aboutDetails.create({
    data: payload,
  });
  return response;
};


const getAboutUsDetailsFromDB = async () => {
  const response = await prisma.aboutDetails.findFirstOrThrow();
  return response;
};



const updateAboutUsDetailsIntoDB = async (payload: AboutDetails) => {
  const existingAboutUs = await prisma.aboutDetails.findFirstOrThrow();
  const response = await prisma.aboutDetails.update({
    where: { id: existingAboutUs.id },
    data: payload,
  });

  return response;
};



export const AboutUsDetailsServices = {
  createAboutUsDetailsIntoDB,
  getAboutUsDetailsFromDB,
  updateAboutUsDetailsIntoDB,
};
