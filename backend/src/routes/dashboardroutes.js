import express from "express";
import { authMiddleware } from "../middleware/authmiddleware.js";
import { getDashboard } from "../controllers/dashboard.js";

const router5=express.Router();

router5.get("/dashboard",authMiddleware,getDashboard);

export default router5;