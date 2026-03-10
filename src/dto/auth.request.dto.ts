import type { Request } from "express";
import { RegisterInput } from "../validators/auth.schema.js";

export const registerRequestDTO = (req: Request): RegisterInput => {
  const body = req.body ?? {};
  return {
    name: body.name,
    email: body.email,
    password: body.password,
  };
};
