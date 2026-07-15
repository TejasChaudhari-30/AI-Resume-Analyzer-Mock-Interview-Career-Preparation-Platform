import { z } from "zod";

export const generateInterviewSchema = z.object({

    resumeId: z
        .uuid(),

    targetRole: z
        .string()
        .min(2),

    difficulty: z.enum([
        "easy",
        "medium",
        "hard"
    ])
});



export const submitAnswersSchema = z.object({
    answers: z.array(
        z.object({
            questionId: z.uuid(),
            answer: z.string().min(1, "Answer cannot be empty")
        })
    ).min(1, "At least one answer is required")
});