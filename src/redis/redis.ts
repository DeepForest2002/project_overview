import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.REDIS_URL || "redis://localhost:6379";

export const redisClient = createClient({
  url: url,
});

redisClient.on("connect", () => {
  console.log("Redis client is connected");
});

redisClient.on("ready", () => {
  console.log("Redis client is ready");
});
redisClient.on("error", () => {
  console.log("Some error occurred");
});

redisClient.on("end", () => {
  console.log("Redis client connection closed");
});

export async function createRedisConnection() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  const pong = await redisClient.ping();
  console.log("Ping ", pong);
}

export async function CloseRedisConnection() {
  if (redisClient.isOpen) {
    await redisClient.quit();
  }
  console.log("Redis disconnected");
}

const redisUrl = new URL(url);

export const bullmqConnection = {
  host: redisUrl.hostname,
  port: Number(redisUrl.port),
  maxRetriesPerRequest: null,
};
