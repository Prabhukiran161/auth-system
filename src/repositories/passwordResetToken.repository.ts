import { PasswordResetToken } from "../models/passwordReset.model.js";
import { RESET_TOKEN_TTL } from "../utils/token.js";
import { Types } from "mongoose";

export const createPasswordResetToken = async (
  userId: Types.ObjectId,
  token: string,
  expiresAt = new Date(Date.now() + RESET_TOKEN_TTL),
) => {
  await PasswordResetToken.deleteMany({ userId });
  return PasswordResetToken.create({ userId, token, expiresAt });
};
