import { sendVerificationEmail } from "../email/email.service.js";
import { AppError } from "../errors/AppError.js";
import { EmailVerificationToken } from "../models/emailVerification.model.js";
import { Session } from "../models/session.model.js";
import { User, UserDocument } from "../models/user.model.js";
import {
  createEmailVerificationToken,
  deleteEmailVerificationToken,
} from "../repositories/emailVerification.repository.js";
import { compareHash, generateHash } from "../utils/password.js";
import {
  generateAccessToken,
  generateRefreshToken,
  generateVerificationToken,
  REFRESH_TOKEN_TTL,
  verifyRefreshToken,
} from "../utils/token.js";
import {
  changePasswordDocument,
  LoginInput,
  RefreshTokenPayload,
  RegisterInput,
  ResendVerificationInput,
  VerifyEmailToken,
} from "../validators/auth.schema.js";

export const registerService = async (
  input: RegisterInput,
): Promise<UserDocument> => {
  const existingUser = await User.findOne({ email: input.email });
  if (existingUser) {
    throw new AppError("EMAIL_ALREADY_EXISTS");
  }
  const hashedPassword = await generateHash(input.password);
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
  email: ResendVerificationInput,
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

export const loginService = async (
  { email, password }: LoginInput,
  meta: { ip: string; userAgent: string; device: string },
) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("INVALID_CREDENTIALS");
  }
  const isValid = await compareHash(password, user.password);
  if (!isValid) {
    throw new AppError("INVALID_CREDENTIALS");
  }
  if (!user.emailVerified) {
    throw new AppError("EMAIL_NOT_VERIFIED");
  }
  if (user.lockUntil && user.lockUntil.getTime() > Date.now()) {
    throw new AppError("ACCOUNT_LOCKED");
  }
  const session = await Session.create({
    userId: user._id,
    device: meta.device,
    ipAddress: meta.ip,
    userAgent: meta.userAgent,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
  });
  const sessionId = session._id;
  const accessToken = generateAccessToken({
    userId: user._id,
    sessionId,
    role: user.role,
  });
  const refreshToken = generateRefreshToken({ sessionId });
  const refreshTokenHash = await generateHash(refreshToken);
  session.refreshTokenHash = refreshTokenHash;
  await session.save();
  return {
    accessToken,
    refreshToken,
  };
};

export const refreshService = async (input: RefreshTokenPayload) => {
  const decoded = verifyRefreshToken(input.refreshToken);
  const session = await Session.findById(decoded.sessionId);
  if (!session) {
    throw new AppError("INVALID_REFRESH_TOKEN");
  }
  if (session.revoked) {
    throw new AppError("INVALID_REFRESH_TOKEN");
  }
  if (session.expiresAt.getTime() < Date.now()) {
    throw new AppError("SESSION_EXPIRED");
  }
  if (!session.refreshTokenHash) {
    throw new AppError("INVALID_REFRESH_TOKEN");
  }
  const isCurrent = await compareHash(
    input.refreshToken,
    session.refreshTokenHash,
  );
  const isPrevious =
    session.previousRefreshTokenHash &&
    (await compareHash(input.refreshToken, session.previousRefreshTokenHash));
  if (!isCurrent && !isPrevious) {
    throw new AppError("INVALID_REFRESH_TOKEN");
  }
  const newRefreshToken = generateRefreshToken({ sessionId: session._id });
  const user = await User.findById(session.userId);
  if (!user) {
    throw new AppError("INVALID_REFRESH_TOKEN");
  }
  const newAccessToken = generateAccessToken({
    userId: session.userId,
    sessionId: session._id,
    role: user.role,
  });
  const newRefreshTokenHash = await generateHash(newRefreshToken);
  session.previousRefreshTokenHash = session.refreshTokenHash;
  session.refreshTokenHash = newRefreshTokenHash;
  await session.save();
  return {
    newAccessToken,
    newRefreshToken,
  };
};

export const logoutService = async (sessionId: string) => {
  const session = await Session.findById(sessionId);
  if (!session) {
    throw new AppError("INVALID_REFRESH_TOKEN");
  }
  session.revoked = true;
  await session.save();
  return { loggedOut: true };
};

export const logoutAllService = async (userId: string) => {
  await Session.updateMany({ userId }, { revoked: true });
  return { sessionsRevoked: true };
};

export const changePasswordService = async (
  input: changePasswordDocument,
  userId: string,
) => {
  if (input.oldPassword === input.newPassword) {
    throw new AppError("INVALID_REQUEST");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("USER_NOT_FOUND");
  }
  const isValid = await compareHash(input.oldPassword, user.password);
  if (!isValid) {
    throw new AppError("INVALID_PASSWORD");
  }
  if (user.isBlocked) {
    throw new AppError("ACCOUNT_BLOCKED");
  }
  user.password = await generateHash(input.newPassword);
  await Promise.all([user.save(), Session.deleteMany({ userId })]);
  return { passwordChanged: true };
};
