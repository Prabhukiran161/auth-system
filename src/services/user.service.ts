import { AppError } from "../errors/AppError.js";
import { EmailVerificationToken } from "../models/emailVerification.model.js";
import { LoginAttempt } from "../models/loginAttempt.model.js";
import { PasswordResetToken } from "../models/passwordReset.model.js";
import { Session } from "../models/session.model.js";
import { User } from "../models/user.model.js";
import { compareHash } from "../utils/password.js";
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

export const deleteUserService = async (password: string, userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("USER_NOT_FOUND");
  }
  const isvalid = await compareHash(password, user.password);
  if (!isvalid) {
    throw new AppError("INVALID_PASSWORD");
  }
  await Promise.all([
    User.deleteOne({ _id: userId }),
    Session.deleteMany({ userId }),
    EmailVerificationToken.deleteMany({ userId }),
    PasswordResetToken.deleteMany({ userId }),
    LoginAttempt.deleteMany({ email: user.email }),
  ]);
  return { deleted: true };
};
