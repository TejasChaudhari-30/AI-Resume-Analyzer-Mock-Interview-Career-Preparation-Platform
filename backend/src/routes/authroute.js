import express from "express";
import {register,login} from "../controllers/authcontrol.js"
import { loginSchema, registerSchema } from "../validations/authSchema.js";
import { validate } from "../middleware/validateMiddleware.js";
import { limitLogin ,limitRegister} from "../middleware/rateLimiter.js";
const router1=express.Router();

router1.post("/register",limitRegister,validate(registerSchema),register);
router1.post("/login",limitLogin,validate(loginSchema),login);

export default router1;