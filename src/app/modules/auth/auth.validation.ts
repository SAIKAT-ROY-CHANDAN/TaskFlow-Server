import { z } from 'zod';

const loginValidation = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters long'),
  }),
});

const registerValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    phone: z.string({ required_error: 'Phone number is required' }),
    designation: z.string({ required_error: 'Designation is required' }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be at least 6 characters long'),
    roleId: z.string({ required_error: 'Role ID is required' }),
  }),
});

const changePasswordValidation = z.object({
  body: z.object({
    currentPassword: z
      .string({ required_error: 'Current password is required' })
      .min(6, 'Current password must be at least 6 characters long'),
    newPassword: z
      .string({ required_error: 'New password is required' })
      .min(6, 'New password must be at least 6 characters long'),
  }),
});

export const authValidations = {
  loginValidation,
  registerValidation,
  changePasswordValidation,
};
