import z from 'zod';

const clientValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Client name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    phone: z.string({ required_error: 'Phone number is required' }),
    address: z.string({ required_error: 'Address is required' }),
  }),
});

const updateClientValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email('Invalid email format').optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const ClientValidation = {
  clientValidationSchema,
  updateClientValidationSchema,
};
