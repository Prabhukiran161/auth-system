import { AppError } from "../errors/AppError.js";
import { User } from "../models/user.model.js";
import { UpdateUserDocument } from "../validators/user.schema.js";

export const getUserService = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("USER_NOT_FOUND");
  }
  return user;
};

export const updateUserService = async (newName: string, userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("USER_NOT_FOUND");
  }
  if (user.name === newName.trim()) {
    return user;
  }
  user.name = newName;
  await user.save();
  return user;
};
