import express from "express";
import {register,login} from "../controllers/authcontrol.js"
import { loginSchema, registerSchema } from "../validations/authSchema.js";
import { validate } from "../middleware/validateMiddleware.js";

const router1=express.Router();

router1.post("/register",validate(registerSchema),register);
router1.post("/login",validate(loginSchema),login);

export default router1;