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
  USER_NOT_FOUND: {
    statusCode: 404,
    message: "User not found",
  },
  INVALID_CREDENTIALS: {
    statusCode: 401,
    message: "Invalid credentials",
  },
  EMAIL_NOT_VERIFIED: {
    statusCode: 401,
    message: "Email is not verified",
  },
  ACCOUNT_LOCKED: {
    statusCode: 423,
    message: "Your account is locked due to multiple failed login attempts.",
  },
  INVALID_REFRESH_TOKEN: {
    statusCode: 401,
    message: "Invalid refresh Token",
  },
  INVALID_SESSION: {
    statusCode: 401,
    message: "Invalid session",
  },
  SESSION_EXPIRED: {
    statusCode: 401,
    message: "Session Expired",
  },
  UNAUTHORIZED: {
    statusCode: 401,
    message: "Unauthorized",
  },
} as const;
