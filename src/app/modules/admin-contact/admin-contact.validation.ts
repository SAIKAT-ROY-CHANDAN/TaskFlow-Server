import { z } from 'zod';

const createAdminContactValidationSchema = z.object({
  body: z.object({
    phone: z.string({ required_error: 'Phone is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email format' }),
    address: z.string({ required_error: 'Address is required' }),
    facebookUrl: z.string().url({ message: 'Invalid Facebook URL' }).optional().or(z.literal('')),
    linkedinUrl: z.string().url({ message: 'Invalid LinkedIn URL' }).optional().or(z.literal('')),
    instagramUrl: z.string().url({ message: 'Invalid Instagram URL' }).optional().or(z.literal('')),
    xUrl: z.string().url({ message: 'Invalid X URL' }).optional().or(z.literal('')),
    discordUrl: z.string().url({ message: 'Invalid Discord URL' }).optional().or(z.literal('')),
    googleMapUrl: z.string().url({ message: 'Invalid Google Map URL' }).optional().or(z.literal('')),
  }),
});

const updateAdminContactValidationSchema = z.object({
  body: z.object({
    phone: z.string().optional(),
    email: z.string().email({ message: 'Invalid email format' }).optional(),
    address: z.string().optional(),
    facebookUrl: z.string().url({ message: 'Invalid Facebook URL' }).optional().or(z.literal('')),
    linkedinUrl: z.string().url({ message: 'Invalid LinkedIn URL' }).optional().or(z.literal('')),
    instagramUrl: z.string().url({ message: 'Invalid Instagram URL' }).optional().or(z.literal('')),
    xUrl: z.string().url({ message: 'Invalid X URL' }).optional().or(z.literal('')),
    discordUrl: z.string().url({ message: 'Invalid Discord URL' }).optional().or(z.literal('')),
    googleMapUrl: z.string().url({ message: 'Invalid Google Map URL' }).optional().or(z.literal('')),
  }),
});

export const AdminContactValidation = {
  create: createAdminContactValidationSchema,
  update: updateAdminContactValidationSchema,
};
