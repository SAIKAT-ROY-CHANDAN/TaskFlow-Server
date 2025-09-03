import z from 'zod';

const partnershipValidation = z.object({
  body: z.object({
    brandName: z.string().optional(),
    url: z.string().optional(),
  }),
});

export const PartnershipValidation = {
  partnershipValidation,
};
