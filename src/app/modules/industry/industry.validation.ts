import z from 'zod';

const industryValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Industry name is required' }),
    slogan: z.string({ required_error: 'Industry slogan is required' }),
  }),
});

const industryUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    slogan: z.string().optional(),
  }),
});

export const IndustryValidation = {
  industryValidationSchema,
  industryUpdateValidationSchema,
};
