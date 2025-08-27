import z from "zod";

const createTestimonialValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    description: z.string({ required_error: "Description is required" }),
    designation: z.string().optional(),
    rating: z.preprocess(
      (val) => Number(val),
      z
        .number({ required_error: "Rating is required" })
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot be more than 5")
    ),
    profilePhoto: z.string().optional(),
  }),
});

const updateTestimonialValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    designation: z.string().optional(),
    rating: z
      .preprocess((val) => (val !== undefined ? Number(val) : undefined), z.number().min(1).max(5))
      .optional(),
    profilePhoto: z.string().optional(),
  }),
});

export const TestimonialValidation = {
  create: createTestimonialValidationSchema,
  update: updateTestimonialValidationSchema,
};
