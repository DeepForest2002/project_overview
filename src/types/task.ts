export type task = {
  id: string;
  title: string;
  status: "pending" | "in_progress" | "resolved";
  user_id: string;
  created_at: Date;
  updated_at: Date;
};

export type TaskStatus = "pending" | "in_progress" | "resolved";
