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
    message: "Service temporarily unavailable",
  },
  EMAIL_ALREADY_EXISTS: {
    statusCode: 400,
    message: "Email already registered",
  },
  INVALID_TOKEN: {
    statusCode: 401,
    message: "Invalid authentication token",
  },
  TOKEN_EXPIRED: {
    statusCode: 401,
    message: "Token has expired",
  },
  EMAIL_ALREADY_VERIFIED: {
    statusCode: 409,
    message: "Email already verified",
  },
  USER_NOT_FOUND: {
    statusCode: 404,
    message: "User not found",
  },
  INVALID_CREDENTIALS: {
    statusCode: 401,
    message: "Invalid email or password",
  },
  EMAIL_NOT_VERIFIED: {
    statusCode: 401,
    message: "Email verification required",
  },
  ACCOUNT_LOCKED: {
    statusCode: 423,
    message: "Account temporarily locked due to multiple failed login attempts",
  },
  ACCOUNT_BLOCKED: {
    statusCode: 403,
    message: "Account has blocked",
  },
  INVALID_REFRESH_TOKEN: {
    statusCode: 401,
    message: "Invalid refresh Token",
  },
  INVALID_ACCESS_TOKEN: {
    statusCode: 401,
    message: "Invalid access Token",
  },
  INVALID_SESSION: {
    statusCode: 401,
    message: "Invalid session",
  },
  SESSION_EXPIRED: {
    statusCode: 401,
    message: "Session has Expired",
  },
  UNAUTHORIZED: {
    statusCode: 401,
    message: "Authentication required",
  },
  INVALID_PASSWORD: {
    statusCode: 401,
    message: "Invalid password",
  },
} as const;

export type ErrorCode = keyof typeof ERROR_CODES;
