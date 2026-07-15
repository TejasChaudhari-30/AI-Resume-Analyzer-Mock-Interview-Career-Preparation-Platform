import { getUserProfile ,updateUserProfile} from "../controllers/userprofile.js";
import { authMiddleware } from "../middleware/authmiddleware.js";
import express from "express";
import { updateProfileSchema } from "../validations/userSchema.js";
import { validate } from "../middleware/validateMiddleware.js";

const router4= express.Router();

router4.get(
    "/profile",
    authMiddleware,
    getUserProfile
);

router4.put(
    "/profile",
    authMiddleware,
    validate(updateProfileSchema),
    updateUserProfile
);
 export default router4;