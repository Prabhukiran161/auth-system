import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  loginController,
  logoutAllController,
  logoutController,
  refreshController,
  registerController,
  resendVerificationController,
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

export default router;
