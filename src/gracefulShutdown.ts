import { Server } from "http";
import net from "net";
import { logger } from "./config/logger.js";
import { disconnectDB } from "./config/db.js";
import { closeSMTP } from "./email/mailer.js";

let isShuttingDown = false;
let isReady = true;

export const gracefulShutdown = (server: Server, sockets: Set<net.Socket>) => {
  const shutdown = async (reason: string, error?: unknown) => {
    if (isShuttingDown) {
      logger.warn("SHUTDOWN_ALREADY_INPROCESS");
      return;
    }

    isShuttingDown = true;
    isReady = false;

    const shutdownStart = Date.now();

    logger.info("GRACEFUL_SHUTDOWN_STARTED", { reason });

    server.getConnections((err, count) => {
      logger.info("ACTIVE_CONNECTIONS", { count });
    });

    if (error instanceof Error) {
      logger.error("SHUTDOWN_TRIGGERED_BY_ERROR", {
        message: error.message,
        stack: error.stack,
      });
    }

    const forceExitTimeout = setTimeout(() => {
      logger.error("GRACEFUL_SHUTDOWN_TIMEOUT_FORCE_EXIT");
      process.exit(1);
    }, 15000);

    try {
      await new Promise<void>((resolve) => {
        server.close(() => {
          logger.info("HTTP_SERVER_CLOSED");
          resolve();
        });

        setTimeout(() => {
          logger.warn("FORCE_DESTROYING_SOCKETS");

          sockets.forEach((socket) => {
            socket.destroy();
          });
        }, 5000);
      });

      await disconnectDB();

      await closeSMTP();

      clearTimeout(forceExitTimeout);

      logger.info("GRACEFUL_SHUTDOWN_COMPLETED", {
        durationMs: Date.now() - shutdownStart,
      });

      process.exit(0);
    } catch (error) {
      if (error instanceof Error) {
        logger.error("GRACEFUL_SHUTDOWN_FAILED", {
          message: error.message,
          stack: error.stack,
        });
      }
      clearTimeout(forceExitTimeout);
      process.exit(1);
    }
  };
  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));

  process.on("unhandledRejection", (reason: unknown) =>
    shutdown("unhandledRejection", reason),
  );
  process.on("uncaughtException", (error: Error) => {
    shutdown("uncaughtException", error);
  });
};

export const isAppReady = () => isReady;
