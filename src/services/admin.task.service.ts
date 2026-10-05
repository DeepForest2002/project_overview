import { AppError } from "../error/AppError.js";
import { task } from "../types/task.js";
import { getAdminTasksRepo } from "../repositories/admin.task.repository.js";
export const taskStatuses = ["pending", "in_progress", "resolved"] as const;

export type TaskStatus = (typeof taskStatuses)[number];

export function isTaskStatus(status: any): status is TaskStatus {
  return taskStatuses.includes(status);
}

export async function getAllTaskServiceAdmin(
  status: any,
): Promise<task[] | null> {
  if (status && (typeof status !== "string" || isTaskStatus(status))) {
    throw new AppError(400, "Invalid task status");
  }

  const allTasks = await getAdminTasksRepo(status);
  return allTasks;
}
