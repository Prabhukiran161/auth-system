import { Server } from "http";
import net from "net";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";
import { logger } from "./config/logger.js";
import { gracefulShutdown } from "./gracefulShutdown.js";

const startServer = async (): Promise<Server> => {
  try {
    await connectDB();

    const server = app.listen(ENV.PORT, () => {
      logger.info("SERVER_STARTED", {
        port: ENV.PORT,
        environment: ENV.NODE_ENV,
      });
    });

    const sockets = new Set<net.Socket>();
    server.on("connection", (socket) => {
      sockets.add(socket);
      server.on("close", () => {
        sockets.delete(socket);
      });
    });

    gracefulShutdown(server, sockets);

    return server;
  } catch (error) {
    if (error instanceof Error) {
      logger.error("SERVER_STARTUP_FAILED", {
        message: error.message,
        stack: error.stack,
      });
    }
    process.exit(1);
  }
};

startServer();
