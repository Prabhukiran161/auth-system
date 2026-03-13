import { ApiResponse } from "../types/api.types.js";
import { ErrorCode } from "../errors/errorCodes.js";

export const successResponse = <T>(data: T): ApiResponse<T> => {
  return {
    success: true,
    data,
    error: null,
  };
};

export const errorResponse = (
  code: ErrorCode,
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
