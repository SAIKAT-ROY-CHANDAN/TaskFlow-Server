import z from 'zod';

const createEmployValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    phone: z.string({ required_error: 'Phone is required' }),
    designation: z.string({ required_error: 'Designation is required' }),
    linkedinUrl: z.string().url('Invalid LinkedIn URL').optional(),
    facebookUrl: z.string().url('Invalid Facebook URL').optional(),
    instagramUrl: z.string().url('Invalid Instagram URL').optional(),
    xUrl: z.string().url('Invalid X URL').optional(),
  }),
});

const updateEmployValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email('Invalid email format').optional(),
    phone: z.string().optional(),
    designation: z.string().optional(),
    linkedinUrl: z.string().url('Invalid LinkedIn URL').optional(),
    facebookUrl: z.string().url('Invalid Facebook URL').optional(),
    instagramUrl: z.string().url('Invalid Instagram URL').optional(),
    xUrl: z.string().url('Invalid X URL').optional(),
  }),
});

export const EmployValidation = {
  create: createEmployValidationSchema,
  update: updateEmployValidationSchema,
};
