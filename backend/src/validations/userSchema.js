import { z } from "zod";

export const updateProfileSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2)
        .optional(),

    target_role: z
        .string()
        .optional(),

    skills: z
        .array(z.string())
        .optional()
});