import type { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger.js";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();

  res.on("finish", () => {
    logger.info("HTTP_REQUEST", {
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      duration: Date.now() - start,
      ip: req.ip,
      //   userId: req.user?.sub || null,
    });
  });

  next();
};
