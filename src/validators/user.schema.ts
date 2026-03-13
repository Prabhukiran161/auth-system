import z from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(3).max(50),
});

export type UpdateUserDocument = z.infer<typeof updateUserSchema>;

export const deleteUserSchema = z.object({
  password: z.string().min(8),
});

export type DeleteUserDocument = z.infer<typeof deleteUserSchema>;
