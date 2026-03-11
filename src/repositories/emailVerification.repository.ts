import { Types } from "mongoose";
import { EmailVerificationToken } from "../models/emailVerification.model.js";

const VERIFICATION_TOKEN_TTL = 1000 * 60 * 60;

export const createEmailVerificationToken = async (
  userId: Types.ObjectId,
  token: string,
  expiresAt: Date = new Date(Date.now() + VERIFICATION_TOKEN_TTL),
) => {
  await EmailVerificationToken.deleteMany({ userId });
  return EmailVerificationToken.create({ userId, token, expiresAt });
};

export const deleteEmailVerificationToken = async (tokenId: Types.ObjectId) => {
  return EmailVerificationToken.deleteOne({ _id: tokenId });
};
