import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  changePasswordController,
  deleteAuthSessionController,
  forgotPasswordController,
  getAuthSessionsController,
  loginController,
  logoutAllController,
  logoutController,
  refreshController,
  registerController,
  resendVerificationController,
  resetPasswordController,
  verifyEmailController,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerController);

router.post("/verify-email", verifyEmailController);

router.post("/resend-verification", resendVerificationController);

router.post("/login", loginController);

router.post("/refresh", refreshController);

router.post("/logout", authMiddleware, logoutController);

router.post("/logout-all", authMiddleware, logoutAllController);

router.post("/change-password", authMiddleware, changePasswordController);

router.post("/forgot-password", forgotPasswordController);

router.post("/reset-password", resetPasswordController);

router.get("/sessions", authMiddleware, getAuthSessionsController);

router.delete(
  "/sessions/:sessionId",
  authMiddleware,
  deleteAuthSessionController,
);

export default router;
