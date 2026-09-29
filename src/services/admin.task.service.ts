import { AppError } from "../error/AppError.js";
import { task } from "../types/task.js";

//Search by query parameters
type AdminTaskListQuery = {
  search?: string;
  status?: string;
};

type AdminTaskListResponse = {
  tasks: task[];
};

type taskStatus = "pending" | "in_progress" | "resolved";
function isTaskValid(status: string): status is taskStatus {
  return (
    status === "pending" || status === "in_progress" || status === "resolved"
  );
}

export async function GetAdminTaskService(
  query: AdminTaskListQuery,
): Promise<AdminTaskListResponse> {
  const search = query.search?.trim() || undefined;
  const status = query.status?.trim() || undefined;

  if (status && !isTaskValid(status)) {
    throw new AppError(
      400,
      "status should be in pending, in_progress, and resolved",
    );
  }

  const task = await GetAdminTaskRepo(search, status);

  return task;
}
