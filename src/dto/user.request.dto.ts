import type { Request } from "express";
import {
  DeleteUserDocument,
  UpdateUserDocument,
} from "../validators/user.schema.js";

export const updateUserRequestDTO = (req: Request): UpdateUserDocument => {
  const body = req.body ?? {};
  return { name: body.name };
};

export const deleteUserRequestDTO = (req: Request): DeleteUserDocument => {
  const body = req.body ?? {};
  return {
    password: body.password,
  };
};
