import db from "../config/db.js";

export const getDashboard = async (req, res) => {
    try {

        const userId = req.user.id;

        // Profile
        const profile = await db.query(
            `
            SELECT
                id,
                name,
                email,
                target_role,
                skills
            FROM users
            WHERE id = $1
            `,
            [userId]
        );

        // Latest Resume
        const latestResume = await db.query(
            `
            SELECT
                id,
                file_name,
                uploaded_at
            FROM resumes
            WHERE user_id = $1
            ORDER BY uploaded_at DESC
            LIMIT 1
            `,
            [userId]
        );

        // Latest Resume Review
        const latestReview = await db.query(
            `
            SELECT
                rr.resume_id,
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
            LIMIT 1
            `,
            [userId]
        );

        // Recent Interviews
        const recentInterviews = await db.query(
            `
            SELECT
                id,
                role,
                difficulty,
                total_score,
                started_at
            FROM interview_sessions
            WHERE user_id = $1
            ORDER BY started_at DESC
            LIMIT 5
            `,
            [userId]
        );

        // Average Interview Score
      
        const resumeCount = await db.query(
    "SELECT COUNT(*) FROM resumes WHERE user_id = $1",
    [req.user.id]
);

const reviewCount = await db.query(
`
SELECT COUNT(*)
FROM resume_reviews rr
JOIN resumes r
ON rr.resume_id = r.id
WHERE r.user_id = $1
`,
[req.user.id]
);
const interviewCount = await db.query(
    "SELECT COUNT(*) FROM interview_sessions WHERE user_id = $1",
    [req.user.id]
);

const averageScore = await db.query(
    "SELECT COALESCE(AVG(total_score),0) AS average FROM interview_sessions WHERE user_id = $1",
    [req.user.id]
);

        return res.status(200).json({


            profile: profile.rows[0] || null,
            stats: {
    resumeCount: Number(resumeCount.rows[0].count),
    reviewCount: Number(reviewCount.rows[0].count),
    interviewCount: Number(interviewCount.rows[0].count),
    averageScore: Math.round(Number(averageScore.rows[0].average))
},

            latestResume: latestResume.rows[0] || null,

            latestReview: latestReview.rows[0] || null,

            recentInterviews: recentInterviews.rows,

        });

    } catch (error) {

        console.error("Dashboard Error:", error);

        return res.status(500).json({
            message: "Failed to fetch dashboard"
        });

    }
};