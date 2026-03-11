import { sendVerificationEmail } from "../email/email.service.js";
import { AppError } from "../errors/AppError.js";
import { EmailVerificationToken } from "../models/emailVerification.model.js";
import { User, UserDocument } from "../models/user.model.js";
import {
  createEmailVerificationToken,
  deleteEmailVerificationToken,
} from "../repositories/emailVerification.repository.js";
import { hashPassword } from "../utils/password.js";
import { generateVerificationToken } from "../utils/token.js";
import {
  RegisterInput,
  resendVerificationInput,
  VerifyEmailToken,
} from "../validators/auth.schema.js";

export const registerService = async (
  input: RegisterInput,
): Promise<UserDocument> => {
  const existingUser = await User.findOne({ email: input.email });
  if (existingUser) {
    throw new AppError("EMAIL_ALREADY_EXISTS");
  }
  const hashedPassword = await hashPassword(input.password);
  const user = await User.create({
    name: input.name,
    email: input.email,
    password: hashedPassword,
  });
  const token = generateVerificationToken();
  await createEmailVerificationToken(user._id, token);
  await sendVerificationEmail(user.email, token);
  return user;
};

export const verifyEmailService = async (token: VerifyEmailToken) => {
  const record = await EmailVerificationToken.findOne(token);
  if (!record) {
    throw new AppError("INVALID_TOKEN");
  }
  if (record.expiresAt.getTime() < Date.now()) {
    throw new AppError("TOKEN_EXPIRED");
  }
  const user = await User.findOne(record.userId);
  if (!user) {
    throw new AppError("INVALID_TOKEN");
  }
  if (user.emailVerified) {
    throw new AppError("EMAIL_ALREADY_VERIFIED");
  }
  user.emailVerified = true;
  await user.save();
  await deleteEmailVerificationToken(record._id);
  return { verified: true };
};

export const resendVerificationService = async (
  email: resendVerificationInput,
) => {
  const user = await User.findOne(email);
  if (!user) {
    throw new AppError("USER_NOT_FOUND");
  }
  if (user.emailVerified) {
    throw new AppError("EMAIL_ALREADY_VERIFIED");
  }
  const token = generateVerificationToken();
  await createEmailVerificationToken(user._id, token);
  await sendVerificationEmail(user.email, token);
  return { message: "VERIFICATION_EMAIL_SENT" };
};
