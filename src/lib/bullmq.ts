// src/config/bullmq.ts
import { createNodeRedisClient } from "bullmq";
import { redisClient } from "../redis/redis.js";
export const bullmqConnection = createNodeRedisClient(redisClient);
