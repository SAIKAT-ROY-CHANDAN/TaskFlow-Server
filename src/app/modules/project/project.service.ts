import { Project } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { deleteImageFile } from '../../utils/deleteFile';

type ProjectMajor = Omit<Project, 'startDate' | 'endDate'> & {
  startDate?: string;
  endDate?: string;
};

const createProjectIntoDB = async (payload: ProjectMajor) => {
  const projectData = {
    title: payload.title,
    description: payload.description,
    businessStrategy: payload.businessStrategy,
    visionAndGoal: payload.visionAndGoal,
    operationalAndProcessOptimization:
      payload.operationalAndProcessOptimization,
    projectSolution: payload.projectSolution,
    projectBusinessStrategy: payload.projectBusinessStrategy,
    categoryId: payload.categoryId,
    client: payload.client,
    thumbnail: payload.thumbnail,
    thumbnailOptional1: payload.thumbnailOptional1,
    thumbnailOptional2: payload.thumbnailOptional2,
    startDate: payload.startDate ? new Date(payload.startDate) : null,
    endDate: payload.endDate ? new Date(payload.endDate) : null,
  };

  const response = await prisma.project.create({
    data: projectData,
    include: {
      category: true,
    },
  });

  return response;
};

const getProjectsFromDB = async (query: Record<string, unknown>) => {
  const projectQuery = builderQuery({
    searchFields: ['title', 'description', 'client'],
    searchTerm: query.searchTerm as string,
    filter: query.filter ? JSON.parse(query.filter as string) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy as string) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const totalProjects = await prisma.project.count({
    where: projectQuery.where,
  });
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalProjects / projectQuery.take);

  const response = await prisma.project.findMany({
    ...projectQuery,
    include: {
      category: true,
    },
  });

  return {
    meta: {
      totalItems: totalProjects,
      totalPages,
      currentPage,
    },
    data: response,
  };
};

const getProjectFromDB = async (id: string) => {
  const response = await prisma.project.findUniqueOrThrow({
    where: { id },
    include: {
      category: true,
    },
  });

  return response;
};

const updateProjectIntoDB = async (
  id: string,
  payload: Partial<ProjectMajor>,
) => {
  const existingProject = await prisma.project.findUniqueOrThrow({
    where: { id },
  });

  const projectData = {
    title: payload.title,
    description: payload.description,
    businessStrategy: payload.businessStrategy,
    visionAndGoal: payload.visionAndGoal,
    operationalAndProcessOptimization:
      payload.operationalAndProcessOptimization,
    projectSolution: payload.projectSolution,
    projectBusinessStrategy: payload.projectBusinessStrategy,
    categoryId: payload.categoryId,
    client: payload.client,
    thumbnail: payload.thumbnail,
    thumbnailOptional1: payload.thumbnailOptional1,
    thumbnailOptional2: payload.thumbnailOptional2,
    startDate: payload.startDate ? new Date(payload.startDate) : undefined,
    endDate: payload.endDate ? new Date(payload.endDate) : undefined,
  };

  // Remove undefined values
  Object.keys(projectData).forEach((key) => {
    if (projectData[key as keyof typeof projectData] === undefined) {
      delete projectData[key as keyof typeof projectData];
    }
  });

  const response = await prisma.project.update({
    where: { id },
    data: projectData,
    include: {
      category: true,
    },
  });

  // Delete old images if new ones are provided
  if (
    payload.thumbnail &&
    payload.thumbnail !== existingProject.thumbnail &&
    existingProject.thumbnail
  ) {
    deleteImageFile(existingProject.thumbnail);
  }
  if (
    payload.thumbnailOptional1 &&
    payload.thumbnailOptional1 !== existingProject.thumbnailOptional1 &&
    existingProject.thumbnailOptional1
  ) {
    deleteImageFile(existingProject.thumbnailOptional1);
  }
  if (
    payload.thumbnailOptional2 &&
    payload.thumbnailOptional2 !== existingProject.thumbnailOptional2 &&
    existingProject.thumbnailOptional2
  ) {
    deleteImageFile(existingProject.thumbnailOptional2);
  }

  return response;
};

const deleteProjectFromDB = async (id: string) => {
  const existingProject = await prisma.project.findUniqueOrThrow({
    where: { id },
  });

  const response = await prisma.project.delete({
    where: { id },
  });

  // Delete associated images
  if (existingProject.thumbnail) {
    deleteImageFile(existingProject.thumbnail);
  }
  if (existingProject.thumbnailOptional1) {
    deleteImageFile(existingProject.thumbnailOptional1);
  }
  if (existingProject.thumbnailOptional2) {
    deleteImageFile(existingProject.thumbnailOptional2);
  }

  return response;
};

export const ProjectServices = {
  createProjectIntoDB,
  getProjectsFromDB,
  getProjectFromDB,
  updateProjectIntoDB,
  deleteProjectFromDB,
};
