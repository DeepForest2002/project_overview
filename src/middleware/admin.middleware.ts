import { Request, Response, NextFunction } from "express";
import { AppError } from "../error/AppError.js";

export function AdminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.user?.role !== "admin") {
    throw new AppError(403, "Unauthorized access, you are not an admin");
  }
  next();
}
