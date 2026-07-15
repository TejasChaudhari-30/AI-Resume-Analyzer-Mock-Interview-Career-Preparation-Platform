import { z } from "zod";

export const resumeReviewSchema = z.object({


    userprompt: z
        .string()
        .max(500)
        .optional()

});