import { JobApplication } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { deleteFile } from '../../utils/deleteFile';
import { json2csv } from 'json-2-csv';

const createJobApplicationIntoDB = async (payload: JobApplication) => {
  const response = await prisma.jobApplication.create({
    data: {
      ...payload,
    },
  });

  return response;
};

const getJobApplicationsFromDB = async (query: Record<string, unknown>) => {
  const jobApplicationQuery = builderQuery({
    searchFields: ['fullName', 'email', 'phoneNumber'],
    searchTerm: query.searchTerm as string,
    filter: query.filter ? JSON.parse(query.filter as string) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy as string) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const totalJobApplications = await prisma.jobApplication.count({
    where: jobApplicationQuery.where,
  });
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalJobApplications / jobApplicationQuery.take);

  const response = await prisma.jobApplication.findMany({
    ...jobApplicationQuery,
    include: {
      jobCircular: true,
    },
  });

  return {
    meta: {
      totalItems: totalJobApplications,
      totalPages,
      currentPage,
    },
    data: response,
  };
};

const getJobApplicationFromDB = async (id: string) => {
  const response = await prisma.jobApplication.findUniqueOrThrow({
    where: { id },
    include: {
      jobCircular: true,
    },
  });

  return response;
};

const updateJobApplicationIntoDB = async (
  id: string,
  payload: Partial<JobApplication>,
) => {
  const existingJobApplication = await prisma.jobApplication.findUniqueOrThrow({
    where: { id },
  });

  const response = await prisma.jobApplication.update({
    where: { id },
    data: {
      ...payload,
      resume: payload.resume || existingJobApplication.resume,
    },
    include: {
      jobCircular: true,
    },
  });

  // Delete old resume if new one is uploaded
  if (
    payload.resume &&
    payload.resume !== existingJobApplication.resume &&
    existingJobApplication.resume
  ) {
    deleteFile(existingJobApplication.resume);
  }

  return response;
};

const deleteJobApplicationFromDB = async (id: string) => {
  const existingJobApplication = await prisma.jobApplication.findUniqueOrThrow({
    where: { id },
  });

  const response = await prisma.jobApplication.delete({
    where: { id },
  });

  // Delete resume file if exists
  if (existingJobApplication.resume) {
    deleteFile(existingJobApplication.resume);
  }

  return response;
};

const getJobApplicationsByJobCircularFromDB = async (
  jobCircularId: string,
  query: Record<string, unknown>,
) => {
  const jobApplicationQuery = builderQuery({
    searchFields: ['fullName', 'email', 'phoneNumber'],
    searchTerm: query.searchTerm as string,
    filter: {
      jobCircularId,
      ...(query.filter ? JSON.parse(query.filter as string) : {}),
    },
    orderBy: query.orderBy ? JSON.parse(query.orderBy as string) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const totalJobApplications = await prisma.jobApplication.count({
    where: jobApplicationQuery.where,
  });
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalJobApplications / jobApplicationQuery.take);

  const response = await prisma.jobApplication.findMany({
    ...jobApplicationQuery,
    include: {
      jobCircular: true,
    },
  });

  return {
    meta: {
      totalItems: totalJobApplications,
      totalPages,
      currentPage,
    },
    data: response,
  };
};

const exportJobApplicationsByJobCircularFromDB = async (id: string) => {
  const response = await prisma.jobApplication.findMany({
    where: {
      jobCircularId: id,
    },
  });

  const convertedCSVData = await json2csv(response, {
    emptyFieldValue: '',
    prependHeader: true,
    keys: [
      'fullName',
      'email',
      'phoneNumber',
      'address',
      'gender',
      'highestEducation',
      'schoolName',
      'expectedSalary',
      'previousCompany',
      'previousPosition',
      'resume',
      'coverLetter',
      'facebookProfile',
      'linkedinProfile',
      'githubProfile',
      'portfolio',
      'createdAt',
    ],
  });

  return convertedCSVData;
};

export const JobApplicationServices = {
  createJobApplicationIntoDB,
  getJobApplicationsFromDB,
  getJobApplicationFromDB,
  updateJobApplicationIntoDB,
  deleteJobApplicationFromDB,
  getJobApplicationsByJobCircularFromDB,
  exportJobApplicationsByJobCircularFromDB,
};
