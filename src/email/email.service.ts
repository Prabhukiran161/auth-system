import { ENV } from "../config/env.js";
import { sendMail } from "./mailer.js";
import { resetPasswordEmailTemplate } from "./templates/resetPasswordEmail.js";
import { verifyEmailTemplate } from "./templates/verifyEmail.js";

export const sendVerificationEmail = async (email: string, token: string) => {
  const verifyUrl = `${ENV.CLIENT_URL}/verify-email?token=${token}`;
  const html = verifyEmailTemplate(verifyUrl);
  await sendMail({
    to: email,
    subject: "Verify Your Email Address",
    html,
  });
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resetURL = `${ENV.CLIENT_URL}/reset-password?token=${token}`;
  const html = resetPasswordEmailTemplate(resetURL);
  await sendMail({ to: email, subject: "Reset Your Password", html });
};
