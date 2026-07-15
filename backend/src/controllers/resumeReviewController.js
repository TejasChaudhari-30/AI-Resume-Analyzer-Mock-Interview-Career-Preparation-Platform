import db from "../config/db.js";
import {reviewResume} from"../services/aiservice.js";


export const review_resume=async (req,res)=>{
    try{
       const {resumeId}=req.params;
       const {userprompt}=req.body;

        const response= await db.query("SELECT parsed_text from resumes where id=$1",[resumeId]);
         if (response.rows.length === 0) {
      return res.status(404).json({
        message: "Resume not found"
      });
    }
        const parsedText = response.rows[0].parsed_text;



const result = await reviewResume(userprompt,parsedText);

//convert the result of ai api in json to js object to access the value of keys

const review=JSON.parse(result);

// console.log(review);

        await db.query(
`
INSERT INTO resume_reviews
(resume_id,score,strengths,weaknesses,suggestions)
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
 return res.status(201).json({
      message: "Resume review generated successfully",
      review
    });
    }
     catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Failed to generate resume review"
    });

  }
}


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

export const getResumereview=async (req,res) => {
try{

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
catch(error){
    console.error(error);
      return res.status(404).json({
      message: "cannot get user's resume review"
    });

}
}
