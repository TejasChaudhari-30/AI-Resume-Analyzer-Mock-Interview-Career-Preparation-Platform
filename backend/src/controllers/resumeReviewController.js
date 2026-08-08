import db from "../config/db.js";
import { reviewResume } from "../services/aiservice.js";
import { reviewQueue } from "../queues/reviewQueue.js";


export const review_resume = async (req, res) => {
    try {

        const { resumeId } = req.params;
        const { userprompt } = req.body;
        const userId = req.user.id;

        // Check resume exists and get status
        const response = await db.query(
            `
            SELECT status
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

        const status = response.rows[0].status;

        if (status === "pending" || status === "processing") {
            return res.status(400).json({
                message: "Resume is still being processed. Please wait."
            });
        }

        if (status === "failed") {
            return res.status(400).json({
                message: "Resume processing failed. Please upload again."
            });
        }

        // Add AI review job to BullMQ
        await reviewQueue.add(
            "generate-review",
            {
                resumeId,
                userId,
                userPrompt: userprompt
            },
            {
                attempts: 3,
                backoff: {
                    type: "exponential",
                    delay: 5000
                }
            }
        );

        return res.status(202).json({
            message: "Resume review generation started.",
            status: "processing"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Failed to start review generation"
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
