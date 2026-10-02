import { pool } from "../lib/db.js";
import { task, TaskStatus } from "../types/task.js";

export async function getAdminTasksRepo(
  status: TaskStatus,
): Promise<task[] | null> {
  const result = await pool.query(
    `
  SELECT id, title, status, user_id, created_at, updated_at
  FROM support_tasks
  WHERE ($1::task_status IS NULL OR status = $1::task_status)
  ORDER BY created_at DESC
  `,
    [status ?? null],
  );
  return result.rows ?? null;
}
