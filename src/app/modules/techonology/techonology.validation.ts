import { z } from 'zod';

const createTechnologyValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    icon: z
      .string()
      .url({ message: 'Icon must be a valid URL' })
      .optional(),
  }),
});


const updateTechnologyValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    icon: z
      .string()
      .url({ message: 'Icon must be a valid URL' })
      .optional(),
  }),
});

export const TechnologyValidation = {
  create: createTechnologyValidationSchema,
  update: updateTechnologyValidationSchema,
};
