import { z } from 'zod';

export const registerValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters long'),
    fullName: z.string({ required_error: 'Full name is required' }),
    role: z.enum(['ADMIN', 'MANAGER', 'USER']).optional().default('USER'),
  }),
});

export const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export type TRegisterInput = z.infer<typeof registerValidationSchema>;
export type TLoginInput = z.infer<typeof loginValidationSchema>;
