import { AppError } from "../error/AppError.js";
import { pool } from "../lib/db.js";
import { DBUserWithPasswordRow, User, UserDbRow } from "../types/user.js";

export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await pool.query(
    `SELECT id, email, role, created_at FROM users WHERE email=$1`,
    [email],
  );
  return result.rows[0] ?? null;
}

export async function CreateUser(
  email: string,
  passowordHash: string,
): Promise<User> {
  const result = await pool.query(
    `INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, role, created_at`,
    [email, passowordHash],
  );
  return result.rows[0];
}

export async function findEmailWithPassword(email: string) {
  const result = await pool.query(
    `select id, email, role, password_hash, created_at from users where email=$1`,
    [email],
  );

  return result.rows[0] ?? null;
}
