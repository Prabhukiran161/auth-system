import { Router } from "express";
import {
  loginController,
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

router.post("/logout", logoutController);

export default router;
