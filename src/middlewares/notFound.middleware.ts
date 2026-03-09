import type { Request, Response } from "express";
import { ERROR_CODES } from "../errors/errorCodes.js";
import { errorResponse } from "../utils/apiResponse.js";
import { logger } from "../config/logger.js";

export const notFoundHandler = (req: Request, res: Response) => {
  logger.info("ROUTE_NOT_FOUND", {
    method: req.method,
    path: req.originalUrl,
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });
  const errorConfig = ERROR_CODES.NOT_FOUND;
  res
    .status(errorConfig.statusCode)
    .json(
      errorResponse("NOT_FOUND", `${errorConfig.message}: ${req.originalUrl}`),
    );
};
