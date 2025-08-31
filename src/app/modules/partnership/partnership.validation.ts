import z from 'zod';

const partnershipValidation = z.object({
  body: z.object({
    brandName: z.string({ required_error: 'Brand name is required' }),
    url: z.string({ required_error: 'URL is required' }).optional(),
  }),
});

export const PartnershipValidation = {
  partnershipValidation,
};
