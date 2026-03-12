import {
  loginRequestDTO,
  logoutRequestDTO,
  refreshRequestDTO,
  registerRequestDTO,
  resendVerificationRequestDTO,
  verifyEmailRequestDTO,
} from "../dto/auth.request.dto.js";
import {
  loginSchema,
  logoutSchema,
  refreshSchema,
  registerSchema,
  resendVerificationSchema,
  verifyEmailSchema,
} from "../validators/auth.schema.js";
import {
  loginService,
  logoutService,
  refreshService,
  registerService,
  resendVerificationService,
  verifyEmailService,
} from "../services/auth.service.js";
import { registerResponseDTO } from "../dto/auth.response.dto.js";
import { successResponse } from "../utils/apiResponse.js";
import { catchAsync } from "../utils/catchAsync.js";
import { refreshTokenCookieOptions } from "../utils/cookie.js";
import { extractDevice } from "../utils/device.js";

export const registerController = catchAsync(async (req, res) => {
  const dto = registerRequestDTO(req);
  const validatedData = registerSchema.parse(dto);
  const user = await registerService(validatedData);
  const response = registerResponseDTO(user);
  res.status(201).json(successResponse(response));
});

export const verifyEmailController = catchAsync(async (req, res) => {
  const dto = verifyEmailRequestDTO(req);
  const validatedToken = verifyEmailSchema.parse(dto);
  const response = await verifyEmailService(validatedToken);
  res.status(200).json(successResponse(response));
});

export const resendVerificationController = catchAsync(async (req, res) => {
  const dto = resendVerificationRequestDTO(req);
  const validatedEmail = resendVerificationSchema.parse(dto);
  const response = await resendVerificationService(validatedEmail);
  res.status(200).json(successResponse(response));
});

export const loginController = catchAsync(async (req, res) => {
  const dto = loginRequestDTO(req);
  const validatedData = loginSchema.parse(dto);
  const userAgent = req.get("user-agent") ?? "";
  const metaData = {
    ip: req.ip ?? "",
    userAgent: userAgent,
    device: extractDevice(userAgent),
  };
  const tokens = await loginService(validatedData, metaData);
  res.cookie("refreshToken", tokens.refreshToken, refreshTokenCookieOptions);
  res.status(200).json(successResponse({ accessToken: tokens.accessToken }));
});

export const refreshController = catchAsync(async (req, res) => {
  const dto = refreshRequestDTO(req);
  const validatedRefreshToken = refreshSchema.parse(dto);
  const newtokens = await refreshService(validatedRefreshToken);
  req.cookies.refreshToken = newtokens.newRefreshToken;
  res
    .status(200)
    .json(successResponse({ accessToken: newtokens.newAccessToken }));
});

export const logoutController = catchAsync(async (req, res) => {
  const dto = logoutRequestDTO(req);
  const validatedRefreshToken = logoutSchema.parse(dto);
  const response = await logoutService(validatedRefreshToken);
  res.clearCookie("refreshToken", refreshTokenCookieOptions);
  res.status(200).json(successResponse(response));
});
