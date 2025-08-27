import z from 'zod';

const createTermsConditonsValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is required' }),
    description: z.string().optional(),
  }),
});

const updateTermsConditonsValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const TermsCOnditonsValidation = {
  create: createTermsConditonsValidationSchema,
  update: updateTermsConditonsValidationSchema,
};
