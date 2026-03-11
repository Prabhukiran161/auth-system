import { Router } from "express";
import {
  registerController,
  resendVerificationController,
  verifyEmailController,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerController);

router.post("/verify-email", verifyEmailController);

router.post("/resend-verification", resendVerificationController);

export default router;
