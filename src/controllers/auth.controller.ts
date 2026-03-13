import {
  changePasswordRequestDTO,
  forgotPasswordRequestDTO,
  loginRequestDTO,
  refreshRequestDTO,
  registerRequestDTO,
  resendVerificationRequestDTO,
  verifyEmailRequestDTO,
} from "../dto/auth.request.dto.js";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  refreshSchema,
  registerSchema,
  resendVerificationSchema,
  verifyEmailSchema,
} from "../validators/auth.schema.js";
import {
  changePasswordService,
  forgotPasswordService,
  loginService,
  logoutAllService,
  logoutService,
  refreshService,
  registerService,
  resendVerificationService,
  verifyEmailService,
} from "../services/auth.service.js";
import { registerResponseDTO } from "../dto/auth.response.dto.js";
import { successResponse } from "../utils/apiResponse.js";
import { catchAsync } from "../utils/catchAsync.js";
import { refreshTokenCookieOptions } from "../config/cookie.js";
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
  const response = await logoutService(req.user!.sessionId);
  res.clearCookie("refreshToken", refreshTokenCookieOptions);
  res.status(200).json(successResponse(response));
});

export const logoutAllController = catchAsync(async (req, res) => {
  const response = await logoutAllService(req.user!.userId);
  res.clearCookie("refreshToken", refreshTokenCookieOptions);
  res.status(200).json(successResponse(response));
});

export const changePasswordController = catchAsync(async (req, res) => {
  const dto = changePasswordRequestDTO(req);
  const validatedData = changePasswordSchema.parse(dto);
  const response = await changePasswordService(validatedData, req.user!.userId);
  res.clearCookie("refreshToken", refreshTokenCookieOptions);
  res.status(200).json(successResponse(response));
});

export const forgotPasswordController = catchAsync(async (req, res) => {
  const dto = forgotPasswordRequestDTO(req);
  const validEmail = forgotPasswordSchema.parse(dto);
  const response = await forgotPasswordService(
    validEmail.email.toLowerCase().trim(),
  );
  res.status(200).json(successResponse(response));
});
