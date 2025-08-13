import z from 'zod';

const createAdminContactValidationSchema = z.object({
  body: z.object({
    phone: z.string({ required_error: 'Phone is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email format' }),
    address: z.string({ required_error: 'Address is required' }),
    facebookUrl: z.string().url({ message: 'Invalid Facebook URL' }).optional(),
    linkedinUrl: z.string().url({ message: 'Invalid LinkedIn URL' }).optional(),
    instagramUrl: z
      .string()
      .url({ message: 'Invalid Instagram URL' })
      .optional(),
    xUrl: z.string().url({ message: 'Invalid X URL' }).optional(),
    discordUrl: z.string().url({ message: 'Invalid Discord URL' }).optional(),
    googleMapUrl: z
      .string()
      .url({ message: 'Invalid Google Map URL' })
      .optional(),
  }),
});

const updateAdminContactValidationSchema = z.object({
  body: z.object({
    phone: z.string().optional(),
    email: z.string().email({ message: 'Invalid email format' }).optional(),
    address: z.string().optional(),
    facebookUrl: z.string().url({ message: 'Invalid Facebook URL' }).optional(),
    linkedinUrl: z.string().url({ message: 'Invalid LinkedIn URL' }).optional(),
    instagramUrl: z
      .string()
      .url({ message: 'Invalid Instagram URL' })
      .optional(),
    xUrl: z.string().url({ message: 'Invalid X URL' }).optional(),
    discordUrl: z.string().url({ message: 'Invalid Discord URL' }).optional(),
    googleMapUrl: z
      .string()
      .url({ message: 'Invalid Google Map URL' })
      .optional(),
  }),
});

export const AdminContactValidation = {
  create: createAdminContactValidationSchema,
  update: updateAdminContactValidationSchema,
};
