import mongoose from "mongoose";
import { required } from "zod/mini";

const passwordResetTokenSchema = new mongoose.Schema(
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
    used: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type PasswordResetTokenDocument = mongoose.InferSchemaType<
  typeof passwordResetTokenSchema
>;

export const PasswordResetToken = mongoose.model(
  "PasswordResetToken",
  passwordResetTokenSchema,
);
