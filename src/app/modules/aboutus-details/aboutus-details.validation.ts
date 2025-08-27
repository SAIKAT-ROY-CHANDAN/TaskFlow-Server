import { z } from "zod";

const createAboutUsDetailsValidationSchema = z.object({
  body: z.object({
    experience: z
      .string({ required_error: "Experience is required" })
      .refine((val) => !isNaN(Number(val)), {
        message: "Experience must be a number",
      }),
    description: z
      .string({ required_error: "Description is required" })
      .min(1, "Description is required"),
    mission: z
      .string({ required_error: "Mission is required" })
      .min(1, "Mission is required"),
    vision: z
      .string({ required_error: "Vision is required" })
      .min(1, "Vision is required"),
    values: z
      .string({ required_error: "Values is required" })
      .min(1, "Values is required"),
  }),
});

const updateAboutUsDetailsValidationSchema = z.object({
  body: z.object({
    experience: z
      .string()
      .optional()
      .refine((val) => (val === undefined ? true : !isNaN(Number(val))), {
        message: "Experience must be a number",
      }),
    description: z.string().optional(),
    mission: z.string().optional(),
    vision: z.string().optional(),
    values: z.string().optional(),
  }),
});

export const AboutUsDetailsValidation = {
  create: createAboutUsDetailsValidationSchema,
  update: updateAboutUsDetailsValidationSchema,
};
