import z from 'zod';

const faqStatusEnum = z.enum(['ACTIVE', 'INACTIVE']);

const createFaqValidationSchema = z.object({
  body: z.object({
    question: z.string({ required_error: 'Question is required' }),
    answer: z.string({ required_error: 'Answer is required' }),
    status: faqStatusEnum.optional(), // defaults to ACTIVE in Prisma
  }),
});

const updateFaqValidationSchema = z.object({
  body: z.object({
    question: z.string().optional(),
    answer: z.string().optional(),
    status: faqStatusEnum.optional(),
  }),
});

export const FaqValidation = {
  create: createFaqValidationSchema,
  update: updateFaqValidationSchema,
};
