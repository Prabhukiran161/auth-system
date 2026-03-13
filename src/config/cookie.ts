import { ENV } from "./env.js";
import { REFRESH_TOKEN_TTL } from "../utils/token.js";
import type { CookieOptions } from "express";

export const refreshTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: ENV.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: REFRESH_TOKEN_TTL,
  path: "/auth/refresh",
};
