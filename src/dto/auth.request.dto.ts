import type { Request } from "express";
import {
  changePasswordDocument,
  ForgotPasswordDocument,
  LoginInput,
  RefreshTokenPayload,
  RegisterInput,
  ResendVerificationInput,
  VerifyEmailToken,
} from "../validators/auth.schema.js";

export const registerRequestDTO = (req: Request): RegisterInput => {
  const body = req.body ?? {};
  return {
    name: body.name,
    email: body.email,
    password: body.password,
  };
};

export const verifyEmailRequestDTO = (req: Request): VerifyEmailToken => {
  const body = req.body ?? {};
  return {
    token: body.token,
  };
};

export const resendVerificationRequestDTO = (
  req: Request,
): ResendVerificationInput => {
  const body = req.body ?? {};
  return {
    email: body.email,
  };
};

export const loginRequestDTO = (req: Request): LoginInput => {
  const body = req.body ?? {};
  return {
    email: body.email,
    password: body.password,
  };
};

export const refreshRequestDTO = (req: Request): RefreshTokenPayload => {
  return { refreshToken: req.cookies.refreshToken };
};

export const changePasswordRequestDTO = (
  req: Request,
): changePasswordDocument => {
  const body = req.body ?? {};
  return { oldPassword: body.oldPassword, newPassword: body.newPassword };
};

export const forgotPasswordRequestDTO = (
  req: Request,
): ForgotPasswordDocument => {
  const body = req.body ?? {};
  return { email: body.email };
};
