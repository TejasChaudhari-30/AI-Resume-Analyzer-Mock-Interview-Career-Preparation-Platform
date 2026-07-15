import express from "express";
import { authMiddleware } from "../middleware/authmiddleware.js";
import { upload } from "../middleware/uploadmiddleware.js";
import { uploadResume ,deleteResume, getUserResumes} from "../controllers/resumeController.js";
import { getResumereview, getResumeReviewByResumeId, review_resume } from "../controllers/resumeReviewController.js";
import { resumeReviewSchema } from "../validations/resumeSchema.js";
import { validate } from "../middleware/validateMiddleware.js";

const router2=express.Router();

router2.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);
router2.post("/review/:resumeId",authMiddleware,validate(resumeReviewSchema),review_resume);
router2.get("/review/:resumeId",authMiddleware,getResumeReviewByResumeId); //get that resume review
router2.get("/",authMiddleware,getUserResumes)
router2.get("/reviews",authMiddleware,getResumereview);//get all user  review 
router2.delete("/:resumeId",authMiddleware,deleteResume);

export default router2;