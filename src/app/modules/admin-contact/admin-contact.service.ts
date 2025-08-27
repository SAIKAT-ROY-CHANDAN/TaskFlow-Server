import { AdminContact } from '@prisma/client';
import prisma from '../../../db/db.config';

type AdminContactCreatePayload = {
  phone: string;
  email: string;
  address: string;
  facebookUrl?: string | null;
  linkedinUrl?: string | null;
  instagramUrl?: string | null;
  xUrl?: string | null;
  discordUrl?: string | null;
  googleMapUrl?: string | null;
};

const createAdminContactIntoDB = async (payload: AdminContactCreatePayload) => {
  const response = await prisma.adminContact.create({
    data: payload,
  });
  return response;
};

// Get the first admin contact, return null if none exists
const getAdminContactsFromDB = async (): Promise<AdminContact | null> => {
  const response = await prisma.adminContact.findFirstOrThrow(); // returns null if empty
  return response;
};



const updateAdminContactIntoDB = async (payload: AdminContact) => {
  const existingContactUs = await prisma.adminContact.findFirstOrThrow();
  const response = await prisma.adminContact.update({
    where: { id: existingContactUs.id },
    data: payload,
  });

  return response;
};



export const AdminContactServices = {
  createAdminContactIntoDB,
  getAdminContactsFromDB,
  updateAdminContactIntoDB,
};
