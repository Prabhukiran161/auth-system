import express from "express";
import type { Application, Request, Response } from "express";
import { requestLogger } from "./middlewares/requestLogger.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import { notFoundHandler } from "./middlewares/notFound.middleware.js";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Typescript Backend is Ready!" });
});

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
