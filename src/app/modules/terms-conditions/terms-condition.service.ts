import {  TermsAndCondition } from '@prisma/client';
import prisma from '../../../db/db.config';

const createTermsConditionsIntoDB = async (payload: TermsAndCondition) => {
  const response = await prisma.termsAndCondition.create({
    data: payload,
  });

  return response;
};

const getTermsConditionsFromDB = async () => {
  const response = await prisma.termsAndCondition.findFirstOrThrow();

  return response;
};


const updateTermsConditionsIntoDB = async (payload: TermsAndCondition) => {
  const existingTermsConditions = await prisma.termsAndCondition.findFirstOrThrow();
  const response = await prisma.termsAndCondition.update({
    where: { id: existingTermsConditions.id },
    data: payload,
  });

  return response;
};


export const TermsConditionsServices = {
  createTermsConditionsIntoDB,
  getTermsConditionsFromDB,
  updateTermsConditionsIntoDB,
};
