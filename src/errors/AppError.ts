import { ERROR_CODES } from "./errorCodes.js";

export class AppError extends Error {
  code: keyof typeof ERROR_CODES;
  statusCode: number;
  isOperational: boolean;

  constructor(code: keyof typeof ERROR_CODES) {
    const errorConfig = ERROR_CODES[code];
    super(errorConfig.message);
    this.code = code;
    this.statusCode = errorConfig.statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
