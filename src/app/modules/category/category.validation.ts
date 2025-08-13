import z from 'zod';

const categoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Category name is required' }),
  }),
});

export const CategoryValidation = {
  categoryValidationSchema,
};
