import { Router } from "express";
import { authentication } from "../middleware/auth.middleware.js";
import { AdminMiddleware } from "../middleware/admin.middleware.js";

export const adminRouter = Router();
adminRouter.use(authentication, AdminMiddleware);

adminRouter.get("/", async (req, res, next) => {
    try {
        const tasks = await AdminService();
  } catch (err) {
    console.log(err);
    next(err);
  }
});
