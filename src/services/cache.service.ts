import { createUserCacheKey } from "../lib/cacheKeys.js";
import { redisClient } from "../redis/redis.js";

export async function invalidUserCache(user_id: string): Promise<void> {
  const cacheKey = createUserCacheKey(user_id);
  await redisClient.del(cacheKey);
  console.log("Redis cache is cleared");
}
