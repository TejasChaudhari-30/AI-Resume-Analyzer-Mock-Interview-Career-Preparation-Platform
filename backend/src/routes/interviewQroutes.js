import { auth } from "google-auth-library";
import { authMiddleware } from "../middleware/authmiddleware.js";
import express from "express";
import { answers, InterviewQ ,getInterviewReport,getInterviewHistory} from "../controllers/InterviewQcontroller.js";
import { generateInterviewSchema, submitAnswersSchema } from "../validations/interviewSchema.js";
import { validate } from "../middleware/validateMiddleware.js";

const router3=express.Router();

router3.post("/generate/:resumeId",authMiddleware,validate(generateInterviewSchema),InterviewQ);
router3.post("/answers/:sessionId",authMiddleware,validate(submitAnswersSchema),answers);
router3.get("/session/:sessionId",authMiddleware,getInterviewReport);
router3.get( "/history", authMiddleware,getInterviewHistory);


export default router3;