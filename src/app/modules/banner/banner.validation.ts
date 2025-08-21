import z from 'zod';

const createBannerValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    subTitle: z.string({ required_error: 'Sub title is required' }),
    description: z.string().optional(),
  }),
});

const updateBannerValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    subTitle: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const BannerValidation = {
  create: createBannerValidationSchema,
  update: updateBannerValidationSchema,
};
