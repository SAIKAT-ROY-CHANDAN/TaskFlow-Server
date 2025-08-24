import z from 'zod';

const createDepartmentHeadValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    phone: z.string({ required_error: 'Phone is required' }),
    designation: z.string({ required_error: 'Designation is required' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters'),
    roleId: z.string({ required_error: 'Role ID is required' }),
    linkedinUrl: z.string().url('Invalid LinkedIn URL').optional(),
    facebookUrl: z.string().url('Invalid Facebook URL').optional(),
    instagramUrl: z.string().url('Invalid Instagram URL').optional(),
    xUrl: z.string().url('Invalid X URL').optional(),
  }),
});

const updateDepartmentHeadValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email('Invalid email format').optional(),
    phone: z.string().optional(),
    designation: z.string().optional(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .optional(),
    roleId: z.string().optional(),
    linkedinUrl: z.string().url('Invalid LinkedIn URL').optional(),
    facebookUrl: z.string().url('Invalid Facebook URL').optional(),
    instagramUrl: z.string().url('Invalid Instagram URL').optional(),
    xUrl: z.string().url('Invalid X URL').optional(),
  }),
});

export const DepartmentHeadValidation = {
  create: createDepartmentHeadValidationSchema,
  update: updateDepartmentHeadValidationSchema,
};
