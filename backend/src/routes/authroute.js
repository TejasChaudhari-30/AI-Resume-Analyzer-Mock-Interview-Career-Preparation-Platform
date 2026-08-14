import express from "express";
import {register,login, changePassword, forgotPassword, resetPassword} from "../controllers/authcontrol.js"
import { loginSchema, registerSchema } from "../validations/authSchema.js";
import { validate } from "../middleware/validateMiddleware.js";
import { limitLogin ,limitRegister} from "../middleware/rateLimiter.js";
import { authMiddleware } from "../middleware/authmiddleware.js";
const router1=express.Router();

router1.post("/register",limitRegister,validate(registerSchema),register);
router1.post("/login",limitLogin,validate(loginSchema),login);
router1.post("/change-password",authMiddleware,changePassword);
router1.post("/forgot-password",forgotPassword);
router1.post("/reset-password",resetPassword);
export default router1;