import { Worker } from "bullmq";

import db from "../config/db.js";
import redis from "../config/redis.js";

import { reviewResume } from "../services/aiservice.js";

const reviewWorker = new Worker(
    "generate-review",

    async (job) => {

        const { resumeId, userId, userPrompt } = job.data;

        try {

            console.log(`Generating review for Resume: ${resumeId}`);

            // Get parsed resume text
            const response = await db.query(
                `
                SELECT parsed_text
                FROM resumes
                WHERE id = $1
                `,
                [resumeId]
            );

            if (response.rows.length === 0) {
                throw new Error("Resume not found");
            }

            const parsedText = response.rows[0].parsed_text;

            if (!parsedText) {
                throw new Error("Resume text not parsed yet.");
            }

            // Call Gemini
            const result = await reviewResume(userPrompt, parsedText);

            const review = JSON.parse(result);

            // Optional:
            // Delete previous review if you allow only one review per resume

            await db.query(
                `
                DELETE FROM resume_reviews
                WHERE resume_id = $1
                `,
                [resumeId]
            );

            // Save new review
            await db.query(
                `
                INSERT INTO resume_reviews
                (
                    resume_id,
                    score,
                    strengths,
                    weaknesses,
                    suggestions
                )
                VALUES($1,$2,$3,$4,$5)
                `,
                [
                    resumeId,
                    review.score,
                    review.strengths,
                    review.weaknesses,
                    review.suggestions
                ]
            );

            // Optional: update resume status
            await db.query(
                `
                UPDATE resumes
                SET status = 'review_completed'
                WHERE id = $1
                `,
                [resumeId]
            );

            // Clear dashboard cache
            await redis.del(`dashboard:${userId}`);

            console.log(`Review Generated Successfully: ${resumeId}`);

        } catch (err) {

            console.error(err);

            await db.query(
                `
                UPDATE resumes
                SET status = 'review_failed'
                WHERE id = $1
                `,
                [resumeId]
            );

            throw err;
        }

    },

    {
        connection: redis,
        concurrency: 3
    }
);

reviewWorker.on("completed", (job) => {
    console.log(`✅ Review Job ${job.id} Completed`);
});

reviewWorker.on("failed", (job, err) => {
    console.log(`❌ Review Job ${job?.id} Failed`);
    console.error(err.message);
});

console.log("🚀 Review Worker Started");