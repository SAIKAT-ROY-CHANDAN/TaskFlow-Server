import z from 'zod';

const createServiceValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z.string({ required_error: 'Description is required' }),
    serviceOffer: z.string().optional(),
    serviceSolution: z.string().optional(),
    serviceOptimization: z.string().optional(),
    categoryId: z.string({ required_error: 'Category ID is required' }),
  }),
});

const updateServiceValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    serviceOffer: z.string().optional(),
    serviceSolution: z.string().optional(),
    serviceOptimization: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});

export const ServiceValidation = {
  create: createServiceValidationSchema,
  update: updateServiceValidationSchema,
};
