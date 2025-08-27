import z from 'zod';

const createPrivacyPolicyValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is required' }),
    description: z.string().optional(),
  }),
});

const updatePrivacyPolicyValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const PrivacyPolicyValidation = {
  create: createPrivacyPolicyValidationSchema,
  update: updatePrivacyPolicyValidationSchema,
};
