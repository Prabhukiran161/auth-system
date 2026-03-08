import winston from "winston";
import { ENV } from "./env.js";

const { combine, timestamp, errors, json, printf, colorize } = winston.format;

const logLevel = ENV.NODE_ENV === "production" ? "info" : "debug";

const devFormat = printf(({ level, message, timestamp, ...meta }) => {
  return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length > 0 ? JSON.stringify(meta, null, 2) : ""}`;
});

const formats = [
  timestamp({ format: "DD-MM-YYYY HH-mm-ss" }),
  errors({ stack: true }),
];

if (logLevel === "debug") {
  formats.unshift(colorize({ all: true }));
  formats.push(devFormat);
} else {
  formats.push(json());
}

export const logger = winston.createLogger({
  level: logLevel,
  format: combine(...formats),
  transports: [new winston.transports.Console()],
  exceptionHandlers: [new winston.transports.Console()],
  rejectionHandlers: [new winston.transports.Console()],
});
