import console from "console";
import db from "../config/db.js";
import fs from "fs";
import pdf from "pdf-parse-new";
import redis from "../config/redis.js";
import { resumeQueue } from "../queues/resumequeue.js";
if (!fs.existsSync("./uploads/resumes")) {
    fs.mkdirSync("./uploads/resumes", { recursive: true });
}
export const uploadResume = async (req, res) => {

    try {
        const userId = req.user.id;
      

        const response = await db.query(
            `
INSERT INTO resumes(
    user_id,
    file_name,
    file_url,
    status
)
VALUES($1,$2,$3,'pending')
RETURNING id
`,
            [
                req.user.id,
                req.file.originalname,
                req.file.path
                
            ]
        );
        console.log(response.rows[0]);
        try {
            await redis.del(`dashboard:${userId}`);
        } catch (err) {
            console.error("Redis DEL Error:", err);
        }
        // console.log("📤 Adding resume job:", response.rows[0].id);

       const job = await resumeQueue.add("process-resume", {
    resumeId: response.rows[0].id,
    userId
});

const counts = await resumeQueue.getJobCounts();
console.log("QUEUE COUNTS:", counts);

console.log("✅ JOB ADDED:", job.id, response.rows[0].id);
      return res.status(201).json({
    message: "Resume uploaded successfully",
    status: "processing",
     resumeId: response.rows[0].id
});


    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Upload failed",
            error: error.message
        });

    }
};

export const getUserResumes = async (req, res) => {

    try {

        const userId = req.user.id;

        const page = Number(req.query.page) || 1;
        const limit = req.query.limit
            ? Number(req.query.limit)
            : null;

        let result;

        if (limit) {

            const offset = (page - 1) * limit;

            result = await db.query(
                `
                SELECT
                    id,
                    file_name,
                    uploaded_at
                FROM resumes
                WHERE user_id = $1
                ORDER BY uploaded_at DESC
                LIMIT $2 OFFSET $3
                `,
                [userId, limit, offset]
            );

        } else {

            result = await db.query(
                `
                SELECT
                    id,
                    file_name,
                    uploaded_at
                FROM resumes
                WHERE user_id = $1
                ORDER BY uploaded_at DESC
                `,
                [userId]
            );

        }

        return res.status(200).json({

            message: "Resumes fetched successfully",

            resumes: result.rows

        });

    }
    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Failed to fetch resumes"

        });

    }

};
export const deleteResume = async (req, res) => {
    try {

        const { resumeId } = req.params;
        const userId = req.user.id;

        // Check if resume belongs to the logged-in user
        const resume = await db.query(
            `
            SELECT *
            FROM resumes
            WHERE id = $1
            AND user_id = $2
            `,
            [resumeId, userId]
        );

        if (resume.rows.length === 0) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        // Delete resume reviews
        await db.query(
            `
            DELETE FROM resume_reviews
            WHERE resume_id = $1
            `,
            [resumeId]
        );

        // Delete resume
        await db.query(
            `
            DELETE FROM resumes
            WHERE id = $1
            `,
            [resumeId]
        );
        try {
            await redis.del(`dashboard:${userId}`);
        } catch (err) {
            console.error("Redis DEL Error:", err);
        }

        return res.status(200).json({
            message: "Resume deleted successfully"
        });

    } catch (error) {

        console.error("Error deleting resume:", error);

        return res.status(500).json({
            message: "Failed to delete resume"
        });

    }
};

export const getResumeStatus = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const userId = req.user.id;

        const result = await db.query(
            `
            SELECT id, status
            FROM resumes
            WHERE id = $1
            AND user_id = $2
            `,
            [resumeId, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        return res.status(200).json({
            status: result.rows[0].status
        });

    } catch (error) {
        console.error("Resume Status Error:", error);

        return res.status(500).json({
            message: "Failed to get resume status"
        });
    }
};