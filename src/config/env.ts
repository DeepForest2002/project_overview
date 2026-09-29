// first load all the env variables
import dotenv from "dotenv";
dotenv.config({ override: true });

function checkRequiredEnv(key: string): string {
  const value = process.env[key]?.trim();
  if (!value) {
    throw new Error(`Missing env variables for ${key}`);
  }
  return key;
}

export const env = {
  port: Number(process.env.PORT ?? 4000),
  isProduction: (process.env.NODE_ENV ?? "development") === "production",
  nodeEnv: process.env.NODE_ENV ?? "development",
  logLevel: process.env.LOG_LEVEL ?? "info",
  db_url: checkRequiredEnv("DATABASE_URL"),
  jwt_secret: checkRequiredEnv("JWT_SECRET"),
  jwt_token_expires: process.env.JWT_ACCESS_EXPIRES_IN,
  rate_limit_window_seconds: Number(process.env.RATE_LIMIT_WINDOW_SECONDS),
  max_request: Number(process.env.RATE_LIMIT_MAX_REQUEST),
} as const; //this is an object
