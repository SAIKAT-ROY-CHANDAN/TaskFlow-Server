import { Blog, Tag } from '@prisma/client';
import prisma from '../../../db/db.config';
import { builderQuery } from '../../builders/prismaBuilderQuery';
import { deleteImageFile } from '../../utils/deleteFile';

type BlogMajor = Blog & {
  tags: Tag[];
};

const createBlogIntoDB = async (payload: BlogMajor) => {
  const response = await prisma.blog.create({
    data: {
      ...payload,
      tags: {
        create: payload.tags.map((tag) => ({
          name: tag.name,
        })),
      },
    },
    include: {
      tags: true,
    },
  });

  return response;
};

const getBlogsFromDB = async (query: Record<string, any>) => {
  const blogQuery = builderQuery({
    searchFields: ['title'],
    searchTerm: query.searchTerm,
    filter: query.filter ? JSON.parse(query.filter) : {},
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 10,
  });

  const totalBlogs = await prisma.blog.count({ where: blogQuery.where });
  const currentPage = Number(query.page) || 1;
  const totalPages = Math.ceil(totalBlogs / blogQuery.take);

  const response = await prisma.blog.findMany({
    ...blogQuery,
    include: {
      tags: true,
      categories: true,
    },
  });

  return {
    meta: {
      totalItems: totalBlogs,
      totalPages,
      currentPage,
    },
    data: response,
  };
};

const getBlogFromDB = async (id: string) => {
  const response = await prisma.blog.findUniqueOrThrow({
    where: { id },
    include: {
      tags: true,
      categories: true,
    },
  });

  return response;
};

const updateBlogIntoDB = async (id: string, payload: Partial<BlogMajor>) => {
  const existingBlog = await prisma.blog.findUniqueOrThrow({
    where: { id },
    include: {
      tags: true,
    },
  });

  const response = await prisma.blog.update({
    where: { id },
    data: {
      ...payload,
      thumbnail: payload.thumbnail || existingBlog.thumbnail,
      tags: payload.tags
        ? {
            deleteMany: {},
            create: payload.tags.map((tag) => ({
              name: tag.name,
            })),
          }
        : undefined,
    },
  });

  if (
    payload.thumbnail &&
    payload.thumbnail !== existingBlog.thumbnail &&
    existingBlog.thumbnail
  ) {
    deleteImageFile(existingBlog.thumbnail);
  }

  return response;
};

const deleteBlogFromDB = async (id: string) => {
  const existingBlog = await prisma.blog.findUniqueOrThrow({
    where: { id },
    include: {
      tags: true,
    },
  });

  const response = await prisma.blog.delete({
    where: { id },
  });

  if (existingBlog.thumbnail) {
    deleteImageFile(existingBlog.thumbnail);
  }

  return response;
};

export const BlogServices = {
  createBlogIntoDB,
  getBlogsFromDB,
  getBlogFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
