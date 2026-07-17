import console from "console";
import db from "../config/db.js";
import fs from "fs";
import pdf from "pdf-parse-new";

if (!fs.existsSync("./uploads/resumes")) {
    fs.mkdirSync("./uploads/resumes", { recursive: true });
}
export const uploadResume = async (req, res) => {

    try {
        const pdfBuffer = fs.readFileSync(req.file.path);
        const pdfData = await pdf(pdfBuffer);
// console.log(pdf);
    const parsedText = pdfData.text;


        // console.log(pdfData.text);

      const response = await db.query(
`
INSERT INTO resumes
(user_id,file_name,file_url,parsed_text)
VALUES($1,$2,$3,$4)
RETURNING id
`,
[
    req.user.id,
    req.file.originalname,
    req.file.path,
    parsedText
]
);
    
        res.json({
            message: "Resume uploaded",
             resumeId: response.rows[0].id
        });
        


    }catch (error) {

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
