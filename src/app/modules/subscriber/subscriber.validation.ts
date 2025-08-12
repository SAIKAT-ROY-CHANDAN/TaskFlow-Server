import z from 'zod';

const createSubscriberValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email format' }),
  }),
});

const updateSubscriberValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email format' }).optional(),
  }),
});

export const SubscriberValidation = {
  create: createSubscriberValidationSchema,
  update: updateSubscriberValidationSchema,
};
