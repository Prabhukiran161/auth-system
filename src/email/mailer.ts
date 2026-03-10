import nodemailer from "nodemailer";
import { ENV } from "../config/env.js";
import { logger } from "../config/logger.js";

export const transporter = nodemailer.createTransport({
  host: ENV.SMTP_HOST,
  port: ENV.SMTP_PORT,
  secure: false,
  auth: {
    user: ENV.SMTP_USER,
    pass: ENV.SMTP_PASS,
  },
});

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendMail = async ({
  to,
  subject,
  html,
}: SendMailOptions): Promise<void> => {
  await transporter.sendMail({
    from: `"Auth-System" <${ENV.SMTP_USER}>`,
    to,
    subject,
    html,
  });
};

export const verifySMTP = async (): Promise<void> => {
  try {
    await transporter.verify();
    logger.info("SMTP_CONNECTED");
  } catch (error) {
    if (error instanceof Error) {
      logger.error("SMTP_CONNECTION_FAILED", {
        errorMessage: error.message,
        stack: error.stack,
      });
    }
    throw error;
  }
};

export const closeSMTP = async () => {
  transporter.close();
  logger.info("SMTP_CONNECTION_CLOSE");
};
