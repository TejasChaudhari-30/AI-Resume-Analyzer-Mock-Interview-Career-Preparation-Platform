import { Worker } from "bullmq";
import fs from "fs";
import pdf from "pdf-parse-new";

import db from "../config/db.js";
import bullRedis from "../config/bullRedis.js";
const worker = new Worker(
    "resume-review",

    async (job) => {
    //      console.log("📥 JOB RECEIVED:", job.id);
    // console.log("📦 JOB DATA:", job.data);

        const { resumeId, userId } = job.data;

        try {

            console.log(`Processing Resume ${resumeId}`);

            // Mark processing
            await db.query(
                `
                UPDATE resumes
                SET status='processing'
                WHERE id=$1
                `,
                [resumeId]
            );

            // Get file path
            const result = await db.query(
                `
                SELECT file_url
                FROM resumes
                WHERE id=$1
                `,
                [resumeId]
            );

            if (result.rows.length === 0) {
                throw new Error("Resume not found");
            }

            const filePath = result.rows[0].file_url;

            // Read PDF
            const pdfBuffer = fs.readFileSync(filePath);

            // Parse PDF
            const pdfData = await pdf(pdfBuffer);

            const parsedText = pdfData.text;

            // Save parsed text
            await db.query(
                `
                UPDATE resumes
                SET
                    parsed_text = $1,
                    status = 'parsed'
                WHERE id=$2
                `,
                [parsedText, resumeId]
            );

            // Dashboard cache no longer needs invalidation here,
            // because the dashboard data hasn't changed in a way that
            // depends on parsed_text.

            console.log(`Resume ${resumeId} Parsed Successfully`);

        } catch (err) {

            console.error(err);

            await db.query(
                `
                UPDATE resumes
                SET status='failed'
                WHERE id=$1
                `,
                [resumeId]
            );

            throw err;
        }

    },

    {
        connection: bullRedis,
        concurrency: 3
    }
);

worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
    console.log(`Job ${job?.id} failed`);
    console.error(err);
});

console.log("Resume Worker Started");

//2nd worker for resume review
