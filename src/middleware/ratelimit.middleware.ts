import { Request, Response, NextFunction } from "express";
import { createRaterLimiterKey } from "../lib/cacheKeys.js";
import { redisClient } from "../redis/redis.js";
import { env } from "../config/env.js";
import { AppError } from "../error/AppError.js";
export async function RateLimiter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    //each i/p will get its own rate limiter in redis
    // if one user exhaust his/her max req then only this i/p will get rate limited
    //real prod pattern = behind proxy or load balancer
    const ip = req.ip;
    const rateLimiterKey = createRaterLimiterKey(ip);
    const req_count = await redisClient.incr(rateLimiterKey);
    if (req_count === 1) {
      await redisClient.expire(rateLimiterKey, env.rate_limit_window_seconds);
    }
    const ttl = await redisClient.ttl(rateLimiterKey);
    res.setHeader("X-Ratelimit-Limit", env.max_request);
    res.setHeader(
      "X_Ratelimit-Remaining",
      Math.max(0, env.max_request - req_count),
    );
    if (req_count > env.max_request) {
      throw new AppError(429, `Too many requests try after ${ttl}`);
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}
