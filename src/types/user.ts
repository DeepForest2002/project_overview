import z from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type User = {
  id: string;
  email: string;
  role: string;
  created_at: Date;
};

export type UserDbRow = {
  id: string;
  email: string;
  role: string;
  created_at: Date;
};

export type DBUserWithPasswordRow = User & {
  password_hash: string | null;
};

export type UserTokenPayload = {
  id: string;
  email: string;
  role: string;
};
