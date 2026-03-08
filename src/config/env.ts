import dotenv from "dotenv";
import { envSchema } from "../validator/env.schema.js";
dotenv.config();

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables");
  console.error(parsedEnv.error.format());
  process.exit(1);
}

export const ENV = {
  env: parsedEnv.data.NODE_ENV,
  port: parsedEnv.data.PORT,
  mongo_url: parsedEnv.data.MONGO_URL,
  jwt_secret: parsedEnv.data.JWT_SECRET,
  cors_origin: parsedEnv.data.CORS_ORIGIN,
};
