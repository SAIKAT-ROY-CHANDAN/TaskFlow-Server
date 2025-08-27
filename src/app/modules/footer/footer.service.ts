import { Footer } from '@prisma/client';
import prisma from '../../../db/db.config';

const createFooterIntoDB = async (payload: Footer) => {
  const response = await prisma.footer.create({
    data: payload,
  });

  return response;
};

const getFooterFromDB = async () => {
  const response = await prisma.footer.findFirstOrThrow();

  return response;
};

const getSingleFooterFromDB = async (id: string) => {
  const response = await prisma.footer.findUniqueOrThrow({
    where: { id },
  });

  return response;
};

const updateFooterIntoDB = async (payload: Footer) => {
  const existingFooter = await prisma.footer.findFirstOrThrow();
  const response = await prisma.footer.update({
    where: { id: existingFooter.id },
    data: payload,
  });

  return response;
};

const deleteFooterFromDB = async (id: string) => {
  const existingFooter = await prisma.footer.findUniqueOrThrow({
    where: { id },
  });
  if (!existingFooter) {
    throw new Error('footer not found');
  }

  const response = await prisma.footer.delete({
    where: { id },
  });

  return response;
};

export const FooterServices = {
  createFooterIntoDB,
  getFooterFromDB,
  getSingleFooterFromDB,
  updateFooterIntoDB,
  deleteFooterFromDB,
};
