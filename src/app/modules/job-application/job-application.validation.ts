import z from 'zod';

const createJobApplicationValidationSchema = z.object({
  body: z.object({
    fullName: z.string({ required_error: 'Full name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    phoneNumber: z.string({ required_error: 'Phone number is required' }),
    address: z.string({ required_error: 'Address is required' }),
    gender: z.string({ required_error: 'Gender is required' }),
    highestEducation: z.string({
      required_error: 'Highest education is required',
    }),
    schoolName: z.string({ required_error: 'School name is required' }),
    expectedSalary: z.string({ required_error: 'Expected salary is required' }),
    previousCompany: z.string().optional(),
    previousPosition: z.string().optional(),
    coverLetter: z.string().optional(),
    facebookProfile: z.string({
      required_error: 'Facebook profile is required',
    }),
    linkedinProfile: z.string().url('Invalid LinkedIn URL').optional(),
    githubProfile: z.string().url('Invalid GitHub URL').optional(),
    portfolio: z.string().url('Invalid portfolio URL').optional(),
    jobCircularId: z.string({ required_error: 'Job circular ID is required' }),
  }),
});

const updateJobApplicationValidationSchema = z.object({
  body: z.object({
    fullName: z.string().optional(),
    email: z.string().email('Invalid email format').optional(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    gender: z.string().optional(),
    highestEducation: z.string().optional(),
    schoolName: z.string().optional(),
    expectedSalary: z.string().optional(),
    previousCompany: z.string().optional(),
    previousPosition: z.string().optional(),
    coverLetter: z.string().optional(),
    facebookProfile: z.string().optional(),
    linkedinProfile: z.string().url('Invalid LinkedIn URL').optional(),
    githubProfile: z.string().url('Invalid GitHub URL').optional(),
    portfolio: z.string().url('Invalid portfolio URL').optional(),
    jobCircularId: z.string().optional(),
  }),
});

export const JobApplicationValidation = {
  create: createJobApplicationValidationSchema,
  update: updateJobApplicationValidationSchema,
};
