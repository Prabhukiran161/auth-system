import { ERROR_CODES, ErrorCode } from "./errorCodes.js";

export class AppError extends Error {
  code: ErrorCode;
  statusCode: number;
  isOperational: boolean;

  constructor(code: ErrorCode) {
    const errorConfig = ERROR_CODES[code];
    super(errorConfig.message);
    this.code = code;
    this.statusCode = errorConfig.statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
