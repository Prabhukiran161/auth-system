import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError.js";
import { ERROR_CODES } from "../errors/errorCodes.js";
import { logger } from "../config/logger.js";
import { errorResponse } from "../utils/apiResponse.js";

export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    logger.info("VALIDATION_FAILED", {
      method: req.method,
      path: req.originalUrl,
      issueCount: err.issues.length,
    });
    const errorConfig = ERROR_CODES.INVALID_REQUEST;
    return res
      .status(errorConfig.statusCode)
      .json(errorResponse("INVALID_REQUEST", errorConfig.message));
  }

  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json(errorResponse(err.code, err.message));
  }

  if (err instanceof Error) {
    logger.error("UNHANDLED_ERROR", {
      method: req.method,
      path: req.originalUrl,
      errorMessage: err.message,
      stack: err.stack,
    });
  }
  const errorConfig = ERROR_CODES.INTERNAL_SERVER_ERROR;
  res
    .status(errorConfig.statusCode)
    .json(errorResponse("INTERNAL_SERVER_ERROR", errorConfig.message));
};
