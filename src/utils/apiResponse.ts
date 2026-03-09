import { ApiResponse } from "../types/api.types.js";
import { ERROR_CODES } from "../errors/errorCodes.js";

export const successResponse = <T>(data: T): ApiResponse<T> => {
  return {
    success: true,
    data,
    error: null,
  };
};

export const errorResponse = (
  code: keyof typeof ERROR_CODES,
  message: string,
): ApiResponse<null> => {
  return {
    success: false,
    data: null,
    error: {
      code,
      message,
    },
  };
};
