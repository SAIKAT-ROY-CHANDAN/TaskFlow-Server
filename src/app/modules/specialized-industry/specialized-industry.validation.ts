import z from 'zod';

const create = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    description: z.string({ required_error: 'Description is required' }),
    IndustryId: z.string({ required_error: 'Industry ID is required' }).uuid(),
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const SpecializedIndustryValidation = {
  create,
  update,
};
