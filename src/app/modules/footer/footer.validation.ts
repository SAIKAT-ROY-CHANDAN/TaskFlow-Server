import z from 'zod';

const createFooterValidationSchema = z.object({
  body: z.object({
    copyright: z.string({ required_error: 'copyright is required' }),
    description: z.string().optional(),
  }),
});

const updateFooterValidationSchema = z.object({
  body: z.object({
    copyright: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const FooterValidation = {
  create: createFooterValidationSchema,
  update: updateFooterValidationSchema,
};
