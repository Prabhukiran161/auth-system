import type { Request, Response } from "express";
import { logger } from "../config/logger.js";
import { isAppReady } from "../gracefulShutdown.js";
import { ERROR_CODES } from "../errors/errorCodes.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";

export const healthController = (req: Request, res: Response) => {
  if (!isAppReady()) {
    logger.warn("SERVICE_UNAVAILABLE");
    const errorConfig = ERROR_CODES.SERVICE_UNAVAILABLE;
    res
      .status(errorConfig.statusCode)
      .json(errorResponse("SERVICE_UNAVAILABLE", errorConfig.message));
  }
  res.status(200).json(successResponse({ status: "UP" }));
};
