import { Router } from "express";
import { getUserConroller, updateUserController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/me", authMiddleware, getUserConroller);

router.patch("/me",authMiddleware, updateUserController);

export default router;
