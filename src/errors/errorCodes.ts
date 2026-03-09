import { INVALID } from "zod/v3";

export const ERROR_CODES = {
  NOT_FOUND: {
    statusCode: 404,
    message: "Resource not found",
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: "Something went wrong",
  },
  INVALID_REQUEST: {
    statusCode: 400,
    message: "Invalid request data",
  },
} as const;
