import z from 'zod';

const createProjectValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z.string({ required_error: 'Description is required' }),
    businessStrategy: z.string().optional(),
    visionAndGoal: z.string().optional(),
    operationalAndProcessOptimization: z.string().optional(),
    projectSolution: z.string().optional(),
    projectBusinessStrategy: z.string().optional(),
    categoryId: z.string({ required_error: 'Category ID is required' }),
    client: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
});

const updateProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    businessStrategy: z.string().optional(),
    visionAndGoal: z.string().optional(),
    operationalAndProcessOptimization: z.string().optional(),
    projectSolution: z.string().optional(),
    projectBusinessStrategy: z.string().optional(),
    categoryId: z.string().optional(),
    client: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
});

export const ProjectValidation = {
  create: createProjectValidationSchema,
  update: updateProjectValidationSchema,
};
