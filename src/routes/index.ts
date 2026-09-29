//entry file for routes combine all of my routes of my application
//plugging all routes in one place
import { Router } from "express";
import { healthRouter } from "./health.routes.js";
import { authRoutes } from "./auth.routes.js";
import { userTaskRouter } from "./user.task.routes.js";
import { adminRouter } from "./admin.task.routes.js";
export const apiRouter = Router();
apiRouter.use(healthRouter);
apiRouter.use("/auth", authRoutes);
apiRouter.use("/tasks", userTaskRouter);
apiRouter.use("/admin/tasks", adminRouter);
