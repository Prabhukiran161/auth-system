import express from "express";
import type { Application, Request, Response } from "express";
import { requestLogger } from "./middlewares/requestLogger.js";

const app: Application = express();

app.use(requestLogger);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Typescript Backend is Ready!" });
});

export default app;
