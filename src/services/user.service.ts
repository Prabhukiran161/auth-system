import { AppError } from "../errors/AppError.js";
import { User } from "../models/user.model.js";

export const getUserService = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("USER_NOT_FOUND");
  }
  return user;
};
