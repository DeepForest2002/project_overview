import { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger.js";
import { AppError } from "../error/AppError.js";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statuscode).json({ success: false, msg: err.message });
    return;
  }

  // Postgres unique violation -> 409
  if ((err as any).code === "23505") {
    res.status(409).json({ success: false, msg: "Email already present" });
    return;
  }

  logger.error({ err }, "unhandled error");
  res.status(500).json({
    success: false,
    msg: "Internal server error",
    ...(process.env.NODE_ENV !== "production" && { debug: err.message }),
  });
}
