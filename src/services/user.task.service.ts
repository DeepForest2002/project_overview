import { success } from "zod";
import { AppError } from "../error/AppError.js";
import {
  CreateUserTaskDB,
  GetAllUserTasks,
  getTaskDB,
} from "../repositories/user.task.repository.js";
import { task } from "../types/task.js";
import { UUID } from "node:crypto";
import { createUserCacheKey } from "../lib/cacheKeys.js";
import { redisClient } from "../redis/redis.js";
import { invalidUserCache } from "./cache.service.js";

function validateTitle(title: unknown): string {
  if (typeof title !== "string" || !title.trim()) {
    throw new AppError(400, "Title must be of text type");
  }
  const trimmedTitle = title.trim();
  if (trimmedTitle.length > 100) {
    throw new AppError(400, "Max len of title is 100");
  }
  return trimmedTitle;
}

export async function CreateUserTask(
  user_id: string,
  title: unknown,
): Promise<task | null> {
  const validTitle = validateTitle(title);
  const user_task = await CreateUserTaskDB(user_id, validTitle);
  await invalidUserCache(user_id);
  return user_task;
}

export async function getAllUserTasks(user_id: string): Promise<task[] | null> {
  const cacheKey = createUserCacheKey(user_id);
  //check redis
  const cachedTasks = await redisClient.get(cacheKey);

  if (cachedTasks) {
    console.log("Cache HIT");

    return JSON.parse(cachedTasks);
  }

  console.log("Cache Miss");
  const allUserTasks = await GetAllUserTasks(user_id);
  if (allUserTasks) {
    await redisClient.set(cacheKey, JSON.stringify(allUserTasks), {
      EX: 60 * 5,
    });
  }
  return allUserTasks;
}

export async function getTask(
  taskId: string,
  userId: string,
): Promise<task | null> {
  const task = await getTaskDB(taskId, userId);
  if (!task) {
    throw new AppError(404, "Task not found");
  }
  return task;
}
