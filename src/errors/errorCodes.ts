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
  SERVICE_UNAVAILABLE: {
    statusCode: 503,
    message: "Service is temporarily unavailable",
  },
  EMAIL_ALREADY_EXISTS: {
    statusCode: 400,
    message: "Email is already registered",
  },
  INVALID_TOKEN: {
    statusCode: 400,
    message: "Invalid Token",
  },
  TOKEN_EXPIRED: {
    statusCode: 400,
    message: "Token already expired",
  },
  EMAIL_ALREADY_VERIFIED: {
    statusCode: 409,
    message: "Email is already verified",
  },
} as const;
