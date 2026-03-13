import { Router } from "express";
import {
  deleteUserController,
  getUserConroller,
  updateUserController,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/me", authMiddleware, getUserConroller);

router.patch("/me", authMiddleware, updateUserController);

router.delete("/me", authMiddleware, deleteUserController);

export default router;
