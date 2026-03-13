import z from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(3).max(50),
});

export type UpdateUserDocument = z.infer<typeof updateUserSchema>;
