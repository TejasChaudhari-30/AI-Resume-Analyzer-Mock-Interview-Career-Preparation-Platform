import db from "../config/db.js";
import { generateInterviewQuestions } from "../services/aiservice.js";
import { evaluate_answers } from "../services/aiservice.js";
export const InterviewQ = async (req, res) => {
    try {
        // Get resume
        const { resumeId } = req.params;

        const { targetRole, difficulty } = req.body;

        const session = await db.query(
            `
INSERT INTO interview_sessions
(user_id,resume_id,role,difficulty)
VALUES($1,$2,$3,$4)
RETURNING id
`,
            [
                req.user.id,
                resumeId,
                targetRole,
                difficulty
            ]
        );
        
        console.log(session.rows[0].id); //it will give back the session id to later update the score after the evaluation of answers

        const resume = await db.query(
            "SELECT parsed_text FROM resumes WHERE id=$1",
            [resumeId]
        );

        // Get latest review
        const response = await db.query(
            "SELECT * FROM resume_reviews WHERE resume_id=$1 ORDER BY created_at DESC LIMIT 1",
            [resumeId]
        );
        // const response=await db.query("select score, strengths, weaknesses, suggestions from resume_reviews where id=$1",[resume_review_Id]);
        if (resume.rows.length === 0) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }
        const parsedText = resume.rows[0].parsed_text;
        const review = response.rows[0];
        // console.log(review);

        const aiResponse = await generateInterviewQuestions(
            parsedText,
            review,
            targetRole,
            difficulty
        );

        console.log(aiResponse);
        const categories = ["technical", "project", "dsa", "behavioral"];

const insertedQuestions = [];

for (const category of categories) {

    const questions = aiResponse[category];

    for (const question of questions) {

        const result = await db.query(
            `
            INSERT INTO interview_questions
            (session_id, question, category)
            VALUES ($1,$2,$3)
            RETURNING id, question, category
            `,
            [
                session.rows[0].id,
                question,
                category
            ]
        );

        insertedQuestions.push(result.rows[0]);

    }

}
        return res.status(201).json({
            message: "Interview Questions generated successfully or inserting the questions in database",
            sessionId:session.rows[0].id,
            questions:insertedQuestions
        });


    } catch (error) {
        console.error("Error in fetching the review from the database");
        throw error;
    }
}

export const answers=async (req , res)=>{

    try{ 
        //changes to make instead of sending qid each time first store all use answer and then for that samee session  evaluate all ans at the end collectiely 

         const{sessionId}=req.params; //not qid session id x   
        const{answers}=req.body;
         for(const ans of answers){
             await db.query(
        `
        update interview_questions
        set user_answer =$1
        where id=$2
        `,
        [ans.answer,ans.questionId]
    );
         }



        const response=await db.query("select id,question, category ,user_answer from  interview_questions where session_id=$1 and user_answer is not null",[sessionId]);
        

      const evaluation= await evaluate_answers(response.rows);
      const results=evaluation.results;
        for (const result of results) {
  await db.query(
    `
    UPDATE interview_questions
    SET score = $1,
        ai_feedback = $2
    WHERE id = $3
    `,
    [result.score, result.feedback, result.questionId]
  );
}
   await db.query(
`
UPDATE interview_sessions
SET
    total_score = $1,
    overall_feedback = $2,
    ended_at = CURRENT_TIMESTAMP
WHERE id = $3
`,
[
    evaluation.overallScore,
    evaluation.overallFeedback,
    sessionId
]
);
 return res.status(201).json({
            message: "Interview answer is evaluated successfully and score is assigned",
            results
        });

   //insert the question  and answer in table interview-Q

        
    }catch (error) {
        console.error("Error in question evaluation");
        throw error;
    }
}

export const getInterviewReport=async (req ,res)=>{
    try{
        const {sessionId}=req.params;
        const session = await db.query(
`
SELECT
    total_score,
    overall_feedback,
    role,
    difficulty,
    started_at
FROM interview_sessions
WHERE id = $1
`,
[sessionId]
);

const questions = await db.query(
`
SELECT
    question,
    user_answer,
    score,
    ai_feedback,
    category
FROM interview_questions
WHERE session_id = $1
ORDER BY created_at
`,
[sessionId]
);
return res.status(200).json({
    overallScore: session.rows[0].total_score,
    overallFeedback: session.rows[0].overall_feedback,
    questions: questions.rows
});
    }
    catch (error) {

        console.error("Error fetching interview report:", error);

        return res.status(500).json({
            message: "Failed to fetch interview report",
            error: error.message
        });

    }
}
export const getInterviewHistory = async (req, res) => {

    try {

        const userId = req.user.id;

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const offset = (page - 1) * limit;

        const totalResult = await db.query(
            `
            SELECT COUNT(*)
            FROM interview_sessions
            WHERE user_id = $1
            `,
            [userId]
        );

        const total = Number(totalResult.rows[0].count);

        const history = await db.query(
            `
            SELECT
                id,
                role,
                difficulty,
                total_score,
                started_at,
                ended_at
            FROM interview_sessions
            WHERE user_id = $1
            ORDER BY started_at DESC
            LIMIT $2 OFFSET $3
            `,
            [userId, limit, offset]
        );

        return res.status(200).json({

            interviews: history.rows,

            pagination: {

                page,

                limit,

                total,

                totalPages: Math.ceil(total / limit)

            }

        });

    }
    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Failed to fetch interview history"

        });

    }

};

export const deleteInterview = async (req, res) => {

    try {

        const { sessionId } = req.params;

        const userId = req.user.id;

        const session = await db.query(
            `
            SELECT id
            FROM interview_sessions
            WHERE id = $1
            AND user_id = $2
            `,
            [
                sessionId,
                userId
            ]
        );

        if (session.rows.length === 0) {

            return res.status(404).json({

                message: "Interview not found"

            });

        }

        await db.query(
            `
            DELETE FROM interview_questions
            WHERE session_id = $1
            `,
            [sessionId]
        );

        await db.query(
            `
            DELETE FROM interview_sessions
            WHERE id = $1
            `,
            [sessionId]
        );

        return res.status(200).json({

            message: "Interview deleted successfully"

        });

    }
    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: "Failed to delete interview"

        });

    }

};