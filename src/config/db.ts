import mongoose, { Mongoose } from "mongoose";
import { logger } from "./logger.js";
import { ENV } from "./env.js";

export const connectDB = async (): Promise<Mongoose> => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    logger.info("DATABASE_CONNECTED", {
      host: conn.connection.host,
      name: conn.connection.name,
    });
    return conn;
  } catch (error) {
    if (error instanceof Error) {
      logger.info("DATABASE_CONNECTION_FAILED", {
        message: error.message,
        stack: error.stack,
      });
    }
    throw error;
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 0) {
      logger.warn("NO_ACTIVE_MONGODB_CONNECTION");
      return;
    }
    await mongoose.connection.close(false);
    logger.info("DATABASE_DISCONNECTED");
  } catch (error) {
    if (error instanceof Error) {
      logger.info("DATABASE_DISCONNECT_FAILED", {
        message: error.message,
        stack: error.stack,
      });
    }
    throw error;
  }
};
