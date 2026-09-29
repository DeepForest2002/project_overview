import { task } from "../types/task.js";
import { pool } from "../lib/db.js";
import { UUID } from "node:crypto";
export async function CreateUserTaskDB(
  user_id: string,
  title: string,
): Promise<task | null> {
  const result = await pool.query<task>(
    `
        INSERT INTO support_tasks (title, user_id) VALUES ($1, $2) RETURNING id, title, status, user_id, created_at, updated_at
    `,
    [title, user_id],
  );
  return result.rows[0] ?? null;
}

export async function GetAllUserTasks(user_id: string): Promise<task[] | null> {
  const allTasks = await pool.query(
    `
        SELECT id, title, status, user_id, created_at, updated_at FROM support_tasks WHERE user_id=$1
        ORDER BY created_at DESC
    `,
    [user_id],
  );
  return allTasks.rows ?? null;
}

export async function getTaskDB(
  taskId: string,
  userId: string,
): Promise<task | null> {
  const task = await pool.query(
    `
      SELECT id, title, status, user_id, created_at, updated_at FROM support_tasks
      WHERE id=$1 AND user_id=$2
    `,
    [taskId, userId],
  );
  return task.rows[0] ?? null;
}
