import db from "../config/db.js";
import { reviewResume } from "../services/aiservice.js";
import { reviewQueue } from "../queues/reviewQueue.js";
import redis from "../config/redis.js";
import dotenv from "dotenv";
dotenv.config();

export const review_resume = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const { userprompt } = req.body;
        const userId = req.user.id;

        const response = await db.query(
            `
            SELECT parsed_text
            FROM resumes
            WHERE id = $1
            AND user_id = $2
            `,
            [resumeId, userId]
        );

        if (response.rows.length === 0) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        const parsedText = response.rows[0].parsed_text;

        if (!parsedText) {
            return res.status(400).json({
                message: "Resume is still being processed"
            });
        }

        // BullMQ mode
        if (process.env.USE_QUEUE === "true") {

            await db.query(
                `
                UPDATE resumes
                SET status = 'review_pending'
                WHERE id = $1
                `,
                [resumeId]
            );

            await reviewQueue.add("generate-review", {
                resumeId,
                userId,
                userPrompt: userprompt
            });

            return res.status(202).json({
                message: "Resume review added to queue",
                status: "review_pending"
            });
        }

        // Synchronous mode for deployed MVP
        await db.query(
            `
            UPDATE resumes
            SET status = 'review_processing'
            WHERE id = $1
            `,
            [resumeId]
        );

        const result = await reviewResume(
            userprompt,
            parsedText
        );

        const review = JSON.parse(result);

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

        await db.query(
            `
            UPDATE resumes
            SET status = 'review_completed'
            WHERE id = $1
            `,
            [resumeId]
        );

        try {
            await redis.del(`dashboard:${userId}`);
        } catch (err) {
            console.error("Redis DEL Error:", err);
        }

        return res.status(201).json({
            message: "Resume review generated successfully",
            status: "review_completed",
            review
        });

    } catch (error) {

        console.error("Review Error:", error);

        return res.status(500).json({
            message: "Failed to generate resume review"
        });
    }
};

export const getResumeReviewByResumeId = async (req, res) => {

    try {

        const { resumeId } = req.params;
        const userId = req.user.id;

        const review = await db.query(
            `
            SELECT
                rr.id AS review_id,
                r.id AS resume_id,
                r.file_name,
                rr.score,
                rr.strengths,
                rr.weaknesses,
                rr.suggestions,
                rr.created_at
            FROM resume_reviews rr
            JOIN resumes r
            ON rr.resume_id = r.id
            WHERE rr.resume_id = $1
            AND r.user_id = $2
            `,
            [resumeId, userId]
        );

        if (review.rows.length === 0) {

            return res.status(404).json({
                message: "Review not found"
            });

        }

        return res.status(200).json({
            review: review.rows[0]
        });

    }
    catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

}

export const getResumereview = async (req, res) => {
    try {

        const userId = req.user.id;

        const reviews = await db.query(
            `
            SELECT
                rr.id AS review_id,
                r.id AS resume_id,
                r.file_name,
                rr.score,
                rr.strengths,
                rr.weaknesses,
                rr.suggestions,
                rr.created_at
            FROM resume_reviews rr
            JOIN resumes r
            ON rr.resume_id = r.id
            WHERE r.user_id = $1
            ORDER BY rr.created_at DESC
            `,
            [userId]
        );

        return res.status(200).json({
            count: reviews.rows.length,
            reviews: reviews.rows
        });
    }
    catch (error) {
        console.error(error);
        return res.status(404).json({
            message: "cannot get user's resume review"
        });

    }
}
