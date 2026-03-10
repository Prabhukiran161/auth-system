import mongoose from "mongoose";

const loginAttemptSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
    },
    ip: {
      type: String,
      required: true,
      index: true,
    },
    userAgent: String,
    success: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type LoginAttemptDocument = mongoose.InferSchemaType<
  typeof loginAttemptSchema
>;

export const LoginAttempt = mongoose.model("LoginAttempts", loginAttemptSchema);
