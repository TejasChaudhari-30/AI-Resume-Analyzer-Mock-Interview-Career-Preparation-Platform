import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { answers } from "../controllers/InterviewQcontroller.js";
import { stringify } from "node:querystring";

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.gemini_api_key,
});
const model = "gemini-2.5-flash";
export const reviewResume = async (userprompt, resumeText) => {

    try {


        const prompt = `
You are an expert ATS recruiter.

Review the following resume.

Provide:
1. Score out of 100
2. Strengths
3. Weaknesses
4. Suggestions

Additional User Requirement:
${userprompt}

Resume:
${resumeText}
`;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });

        // const review = JSON.parse(response.text);
        // console.log(response.text)

        return response.text;

    }

    catch (error) {

        console.error("Gemini Error:", error);
        throw error;

    }

};

export const generateInterviewQuestions = async (
  parsedText,
  review,
  targetRole,
  difficulty
) => {
  try {
    const prompt = `
You are an expert technical interviewer.

Target Role:
${targetRole}

Difficulty Level:
${difficulty}

Resume Content:
${parsedText}

Resume Review:
Score: ${review.score}

Strengths:
${review.strengths}

Weaknesses:
${review.weaknesses}

Suggestions:
${review.suggestions}

Generate 10 questions:

- 4 Technical Questions
- 3 Project-Based Questions
- 2 DSA Questions
- 1 Behavioral Question

Return JSON:

{
  "technical": [],
  "project": [],
  "dsa": [],
  "behavioral": []
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    return JSON.parse(response.text);

  } catch (error) {
    console.error("Question Generation Error:", error);
    throw error;
  }
};

export const evaluate_answers=async (user_answer)=>{
    try{
       const prompt=`You are an expert interviewer.

Evaluate EACH question-answer pair separately.

Input:

${JSON.stringify(user_answer)}

For every object:
- Use the SAME id from the input
- Give a score from 0-10
- Give short  feedback

Return ONLY JSON:

{
  "results": [
    {
      "questionId": "q1",
      "score": 8,
      "feedback": "Good explanation."
    },
    {
      "questionId": "q2",
      "score": 6,
      "feedback": "Needs more detail."
    }
  ],
  "overallScore": 70,
  "overallFeedback": "Strong technical fundamentals."
}`


 const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });
    
    return JSON.parse(response.text);
    }
    catch (error) {
    console.error("erorr in evaluation of question:", error);
    throw error;
  }
}