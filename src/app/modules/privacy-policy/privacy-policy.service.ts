import {  PrivacyPolicy } from '@prisma/client';
import prisma from '../../../db/db.config';

const createprivacyPolicyIntoDB = async (payload: PrivacyPolicy) => {
  const response = await prisma.privacyPolicy.create({
    data: payload,
  });

  return response;
};

const getprivacyPolicyFromDB = async () => {
  const response = await prisma.privacyPolicy.findFirstOrThrow();
  return response;
};


const updateprivacyPolicyIntoDB = async (payload: PrivacyPolicy) => {
  const existingPrivacyPolicy = await prisma.termsAndCondition.findFirstOrThrow();
  const response = await prisma.termsAndCondition.update({
    where: { id: existingPrivacyPolicy.id },
    data: payload,
  });

  return response;
};


export const privacyPolicyServices = {
    createprivacyPolicyIntoDB,
    getprivacyPolicyFromDB,
    updateprivacyPolicyIntoDB,
};
