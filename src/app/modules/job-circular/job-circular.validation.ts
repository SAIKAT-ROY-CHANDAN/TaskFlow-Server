import z from 'zod';
import { JobType } from '@prisma/client';

const createJobCircularValidationSchema = z.object({
  body: z.object({
    jobTitle: z.string({ required_error: 'Job title is required' }),
    jobType: z.nativeEnum(JobType, { required_error: 'Job type is required' }),
    whatYouWillDo: z.string({ required_error: 'What you will do is required' }),
    jobResponsibilities: z.string({
      required_error: 'Job responsibilities is required',
    }),
    experienceRequired: z.string({
      required_error: 'Experience required is required',
    }),
    additionalRequirements: z.string({
      required_error: 'Additional requirements is required',
    }),
    experience: z
      .number({ required_error: 'Experience (years) is required' })
      .min(0, 'Experience cannot be negative'),
    workingHours: z
      .number({ required_error: 'Working hours is required' })
      .min(1, 'Working hours must be at least 1'),
    workingDays: z
      .number({ required_error: 'Working days is required' })
      .min(1, 'Working days must be at least 1')
      .max(7, 'Working days cannot exceed 7'),
    salary: z.string({ required_error: 'Salary is required' }),
    vacancy: z
      .number({ required_error: 'Vacancy count is required' })
      .min(1, 'Vacancy must be at least 1'),
    deadline: z
      .string({ required_error: 'Deadline is required' })
      .refine((date) => {
        const parsedDate = new Date(date);
        return parsedDate > new Date();
      }, 'Deadline must be a future date'),
  }),
});

const updateJobCircularValidationSchema = z.object({
  body: z.object({
    jobTitle: z.string().optional(),
    jobType: z.nativeEnum(JobType).optional(),
    whatYouWillDo: z.string().optional(),
    jobResponsibilities: z.string().optional(),
    experienceRequired: z.string().optional(),
    additionalRequirements: z.string().optional(),
    experience: z.number().min(0, 'Experience cannot be negative').optional(),
    workingHours: z
      .number()
      .min(1, 'Working hours must be at least 1')
      .optional(),
    workingDays: z
      .number()
      .min(1, 'Working days must be at least 1')
      .max(7, 'Working days cannot exceed 7')
      .optional(),
    salary: z.string().optional(),
    vacancy: z.number().min(1, 'Vacancy must be at least 1').optional(),
    deadline: z
      .string()
      .refine((date) => {
        if (!date) return true; // Allow undefined/null for updates
        const parsedDate = new Date(date);
        return parsedDate > new Date();
      }, 'Deadline must be a future date')
      .optional(),
  }),
});

export const JobCircularValidation = {
  create: createJobCircularValidationSchema,
  update: updateJobCircularValidationSchema,
};
