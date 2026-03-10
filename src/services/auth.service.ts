import { AppError } from "../errors/AppError.js";
import { User, UserDocument } from "../models/user.model.js";
import { hashPassword } from "../utils/password.js";
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

  return user;
};
