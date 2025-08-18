import { Testimonial } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { deleteImageFile } from '../../utils/deleteFile';


const createtesTimonialIntoDB = async (payload: Testimonial) => {
  const ratingAsNumber = parseInt(payload.rating as unknown as string, 10);

  const response = await prisma.testimonial.create({
    data: {
      ...payload,
      rating: ratingAsNumber,
    },
  });

  return response;
};


const getAllTimonialFromDB = async (query: Record<string, any>) => {
  const testimonialQuery = builderQuery({
    searchFields: ['description'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const totalTestimonials = await prisma.testimonial.count({ where: testimonialQuery.where });
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalTestimonials / testimonialQuery.take);

  const response = await prisma.testimonial.findMany({
    ...testimonialQuery,
  });

  return {
    meta: {
      totalItems: totalTestimonials,
      totalPages,
      currentPage,
    },
    data: response,
  };
};

const getSingleTestimonialFromDB = async (id: string) => {
  const response = await prisma.testimonial.findUniqueOrThrow({
    where: { id },
  });

  return response;
};

const updateTestimonialIntoDB = async (id: string, payload: Testimonial) => {
  const existingTestimonial = await prisma.testimonial.findUniqueOrThrow({
    where: { id },
  });

  // Convert rating into an integer (if provided)
  const ratingAsNumber =
    payload.rating !== undefined
      ? parseInt(payload.rating as unknown as string, 10)
      : existingTestimonial.rating;

  const response = await prisma.testimonial.update({
    where: { id },
    data: {
      ...payload,
      rating: ratingAsNumber, // Ensure rating is an integer
      profilePhoto: payload.profilePhoto || existingTestimonial.profilePhoto,
    },
  });

  // If a new profilePhoto is uploaded, delete the old one
  if (
    payload.profilePhoto &&
    payload.profilePhoto !== existingTestimonial.profilePhoto &&
    existingTestimonial.profilePhoto
  ) {
    deleteImageFile(existingTestimonial.profilePhoto);
  }

  return response;
};


const deleteTestimonialFromDB = async (id: string) => {
  const existingBlog = await prisma.testimonial.findUniqueOrThrow({
    where: { id },
  });

  const response = await prisma.blog.delete({
    where: { id },
  });

  if (existingBlog.profilePhoto) {
    deleteImageFile(existingBlog.profilePhoto);
  }

  return response;
};

export const TestimonialServices = {
  createtesTimonialIntoDB,
  getAllTimonialFromDB,
  getSingleTestimonialFromDB,
  updateTestimonialIntoDB,
  deleteTestimonialFromDB,
};
