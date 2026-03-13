import dotenv from "dotenv";
import { envSchema, type Env } from "../validators/env.schema.js";

dotenv.config();

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables");
  console.error(parsedEnv.error.flatten());
  process.exit(1);
}

export const ENV: Env = parsedEnv.data;
