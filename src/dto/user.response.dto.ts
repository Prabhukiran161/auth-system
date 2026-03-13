import { email } from "zod";
import { UserDocument } from "../models/user.model.js";

export const getUserResponseDTO = (user: UserDocument) => {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
  };
};

export const updateUserResponseDTO = (user: UserDocument) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};
