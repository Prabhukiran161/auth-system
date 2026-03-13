import { ErrorCode } from "../errors/errorCodes.js";
export type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  error: {
    code: ErrorCode;
    message: string;
  } | null;
};
