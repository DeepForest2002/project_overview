//main root file

import { createConnection } from "node:net";
import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./lib/logger.js";
import { createRedisConnection, CloseRedisConnection } from "./redis/redis.js";

async function startServer() {
  try {
    await createRedisConnection();
    const app = createApp();
    app.listen(env.port, () => {
      logger.info(`Server is now running on port http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

process.on("SIGTTIN", async () => {
  await CloseRedisConnection();
  process.exit(0);
});

startServer();
