import { sendVerificationEmail } from "../email/email.service.js";
import { AppError } from "../errors/AppError.js";
import { User, UserDocument } from "../models/user.model.js";
import { createEmailVerificationToken } from "../repositories/emailVerification.repository.js";
import { hashPassword } from "../utils/password.js";
import { generateVerificationToken } from "../utils/token.js";
import { RegisterInput } from "../validators/auth.schema.js";

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
