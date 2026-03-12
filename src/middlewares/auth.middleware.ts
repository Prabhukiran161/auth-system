import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import { verifyAccessToken } from "../utils/token.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.get("authorization");
  if (!authHeader) {
    throw new AppError("UNAUTHORIZED");
  }
  const [schema, token] = authHeader.split(" ");

  if (schema !== "Bearer" || !token) {
    throw new AppError("INVALID_TOKEN");
  }

  const payload = verifyAccessToken(token);
  req.user = {
    userId: payload.userId,
    sessionId: payload.sessionId,
    role: payload.role,
  };
  next();
};
