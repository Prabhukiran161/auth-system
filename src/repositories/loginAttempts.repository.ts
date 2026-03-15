import { LoginAttempt } from "../models/loginAttempt.model.js";

export interface LoginAttemptsInput {
  email: string;
  ip: string;
  userAgent: string;
  success: boolean;
}
export const createLoginAttempt = async ({
  email,
  ip,
  userAgent,
  success,
}: LoginAttemptsInput) => {
  return LoginAttempt.create({ email, ip, userAgent, success });
};
