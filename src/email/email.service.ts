import { ENV } from "../config/env.js";
import { sendMail } from "./mailer.js";
import { verifyEmailTemplate } from "./templates/verifyEmail.js";

export const sendVerificationEmail = async (
  email: string,
  token: string,
): Promise<void> => {
  const verifyUrl = `${ENV.CLIENT_URL}/verify-email?token=${token}`;
  const html = verifyEmailTemplate(verifyUrl);
  await sendMail({
    to: email,
    subject: "Verify Your Email Address",
    html,
  });
};
