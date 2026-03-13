import crypto from "crypto";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { Types } from "mongoose";
import { AppError } from "../errors/AppError.js";

export const REFRESH_TOKEN_TTL = 1000 * 60 * 60 * 24 * 7;

export const RESET_TOKEN_TTL = 1000 * 60 * 15;

export const ACCESS_TOKEN_TTL = "15m";

export const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const generateAccessToken = (payload: {
  userId: Types.ObjectId;
  sessionId: Types.ObjectId;
  role: string;
}) => {
  return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: ACCESS_TOKEN_TTL });
};

export const generateRefreshToken = (payload: {
  sessionId: Types.ObjectId;
}) => {
  return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: "7d" });
};

type RefreshToken = { sessionId: string };
export const verifyRefreshToken = (input: string): RefreshToken => {
  try {
    return jwt.verify(input, ENV.JWT_SECRET) as RefreshToken;
  } catch (error) {
    throw new AppError("INVALID_REFRESH_TOKEN");
  }
};

type AccessToken = { userId: string; sessionId: string; role: string };
export const verifyAccessToken = (input: string): AccessToken => {
  try {
    return jwt.verify(input, ENV.JWT_SECRET) as AccessToken;
  } catch (error) {
    throw new AppError("INVALID_ACCESS_TOKEN");
  }
};
