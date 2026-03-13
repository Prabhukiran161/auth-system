import { Router } from "express";
import { getUserConroller } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/me", authMiddleware, getUserConroller);

export default router;
