import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/AppError.js";
import { verifyAccessToken } from "../lib/jwt.js";

export function authentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    throw new AppError(401, "Token is required");
  }
  const token = authHeader.split(" ")[1];
  req.user = verifyAccessToken(token);
  next();
}
