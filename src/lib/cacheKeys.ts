export function createUserCacheKey(user_id: string): string {
  return `user:${user_id}:tasks `;
}

export function createRaterLimiterKey(ip: unknown): string {
  return `user:${ip}:rate-limit`;
}
