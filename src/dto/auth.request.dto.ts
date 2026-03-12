import type { Request } from "express";
import {
  LoginInput,
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
