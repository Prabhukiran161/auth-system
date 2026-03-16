import { LoginAttempt } from "../models/loginAttempt.model.js";

export interface LoginAttemptsMetaDataInput {
  ip: string;
  device: string;
  userAgent: string;
}
export const createLoginAttempt = async (
  email: string,
  meta: LoginAttemptsMetaDataInput,
  success: boolean,
) => {
  const { ip, device, userAgent } = meta;
  return LoginAttempt.create({ email, ip, device, userAgent, success });
};
