import { createAdminBannerKey, createUserCacheKey } from "../lib/cacheKeys.js";
import { redisClient } from "../redis/redis.js";

export async function invalidUserCache(user_id: string): Promise<void> {
  const cacheKey = createUserCacheKey(user_id);
  await redisClient.del(cacheKey);
  console.log("Redis cache is cleared");
}

export async function invalidBannerCache(cacheKey: string): Promise<void> {
  await redisClient.del(cacheKey);
  console.log("redis banner cache is cleared");
}
