import z from 'zod';

const createContactValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email format' }),
    phone: z.string({ required_error: 'Phone is required' }),
    subject: z.string({ required_error: 'Subject is required' }),
    message: z.string({ required_error: 'Message is required' }),
  }),
});

const updateContactValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email({ message: 'Invalid email format' }).optional(),
    phone: z.string().optional(),
    subject: z.string().optional(),
    message: z.string().optional(),
    isOpened: z.boolean().optional(),
  }),
});

export const ContactValidation = {
  create: createContactValidationSchema,
  update: updateContactValidationSchema,
};
