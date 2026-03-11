import z from "zod";

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

export type resendVerificationInput = z.infer<typeof resendVerificationSchema>;
