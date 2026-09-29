import { env } from "../config/env.js";
import { AppError } from "../error/AppError.js";
import { User, UserTokenPayload } from "../types/user.js";
import jwt, { SignOptions } from "jsonwebtoken";

export function generateToken(payload: UserTokenPayload) {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
}

export function verifyAccessToken(token: string): UserTokenPayload {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as UserTokenPayload;
  } catch (err) {
    console.log("Error", err);
    throw new AppError(401, "Invalid token");
  }
}
