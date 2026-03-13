import z, { email } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const verifyEmailSchema = z.object({
  token: z
    .string()
    .length(64, "Invalid token length")
    .regex(/^[a-f0-9]+$/, "Token must be hex"),
});

export type VerifyEmailToken = z.infer<typeof verifyEmailSchema>;

export const resendVerificationSchema = z.object({
  email: z.string().email(),
});

export type ResendVerificationInput = z.infer<typeof resendVerificationSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

export type RefreshTokenPayload = z.infer<typeof refreshSchema>;

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

export type changePasswordDocument = z.infer<typeof changePasswordSchema>;
