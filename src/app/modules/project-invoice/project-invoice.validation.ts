import z from 'zod';

const createProjectInvoiceValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Project name is required' }),
    message: z.string().optional(),
    clientId: z.string({ required_error: 'Client ID is required' }),
  }),
});

const updateProjectInvoiceValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    message: z.string().optional(),
    clientId: z.string().optional(),
  }),
});

export const ProjectInvoiceValidation = {
  createProjectInvoiceValidationSchema,
  updateProjectInvoiceValidationSchema,
};
