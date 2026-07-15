import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must contain at least 2 characters"),

    email: z
        .email("Invalid email"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),

    target_role: z
        .string()
        .min(2, "Target role is required"),

    skills: z
        .array(z.string())
        .min(1, "At least one skill is required")
});

export const loginSchema = z.object({
    email: z
        .email("Invalid email"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
});