import mongoose from "mongoose";
import { required } from "zod/mini";

const emailVerificationTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type EmailVerificationTokenDocument = mongoose.InferSchemaType<
  typeof emailVerificationTokenSchema
>;

export const EmailVerificationToken = mongoose.model(
  "EmailVerificationToken",
  emailVerificationTokenSchema,
);
