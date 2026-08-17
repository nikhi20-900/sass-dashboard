import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z
    .string()
    .email("Enter a valid email address")
    .trim()
    .toLowerCase()
    .max(255, "Email must be at most 255 characters"),
  company: z
    .string()
    .trim()
    .min(2, "Company must be at least 2 characters")
    .max(100, "Company must be at most 100 characters"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
