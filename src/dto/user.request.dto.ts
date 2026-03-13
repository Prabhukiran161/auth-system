import type { Request } from "express";
import { UpdateUserDocument } from "../validators/user.schema.js";

export const updateUserRequestDTO = (req: Request): UpdateUserDocument => {
  const body = req.body ?? {};
  return { name: body.name };
};
