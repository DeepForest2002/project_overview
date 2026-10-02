import { Router } from "express";
import { getAllTaskServiceAdmin } from "../services/admin.task.service.js";
import { authentication } from "../middleware/auth.middleware.js";
import { AdminMiddleware } from "../middleware/admin.middleware.js";
export const adminTaskRouter = Router();

adminTaskRouter.use(authentication, AdminMiddleware);

adminTaskRouter.get("/", async (req, res, next) => {
  try {
    const status = req.query.status || undefined;
    const tasks = await getAllTaskServiceAdmin(status);

    res.status(200).json({
      success: true,
      tasks: tasks,
    });
  } catch (err) {}
});
