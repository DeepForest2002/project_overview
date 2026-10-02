//entry file for routes combine all of my routes of my application
//plugging all routes in one place
import { Router } from "express";
import { authRoutes } from "./auth.routes.js";
import { userTaskRouter } from "./user.task.routes.js";
import { adminBannerRouter } from "./admin.banner.routes.js";
import { adminTaskRouter } from "./admin.task.route.js";

console.log("At api router level");

export const apiRouter = Router();
apiRouter.use("/auth", authRoutes);
apiRouter.use("/tasks", userTaskRouter);
apiRouter.use("/admin/tasks", adminTaskRouter);
apiRouter.use("/admin/banners", adminBannerRouter);
// apiRouter.use("/admin/banners", adminBannerRouter);
