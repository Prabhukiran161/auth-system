import express from "express";
import type { Application } from "express";
import cookieParser from "cookie-parser";
import { requestLogger } from "./middlewares/requestLogger.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import { notFoundHandler } from "./middlewares/notFound.middleware.js";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use("/health", healthRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
