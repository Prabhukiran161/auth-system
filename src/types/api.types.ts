import { ERROR_CODES } from "../errors/errorCodes.js";
export type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  error: {
    code: keyof typeof ERROR_CODES;
    message: string;
  } | null;
};
