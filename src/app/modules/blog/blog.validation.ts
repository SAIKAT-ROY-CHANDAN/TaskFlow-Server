import z from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z.string({ required_error: 'Description is required' }),
    categoryId: z.string({ required_error: 'Category ID is required' }),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});

export const BlogValidation = {
  create: createBlogValidationSchema,
  update: updateBlogValidationSchema,
};
