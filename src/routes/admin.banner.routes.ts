import { Router, Request, Response, NextFunction } from "express";
import { authentication } from "../middleware/auth.middleware.js";
import { AdminMiddleware } from "../middleware/admin.middleware.js";
import { uploadSingleBannerImage } from "../middleware/banner.middleware.js";
import {
  createAdminBannerService,
  getAdminBannerService,
  deleteAdminBannerService,
} from "../services/admin.banner.service.js";
import { success } from "zod";

export const adminBannerRouter = Router();
console.log("Inside banner");
adminBannerRouter.use(authentication, AdminMiddleware);

adminBannerRouter.post("/", uploadSingleBannerImage, async (req, res, next) => {
  try {
    const banner = await createAdminBannerService(req.file, req.user.id);
    res.status(201).json({
      success: true,
      msg: "file uploaded",
      data: { banner },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

adminBannerRouter.get("/", async (req, res, next) => {
  try {
    const banners = await getAdminBannerService(req.user.id);
    res.status(200).json({
      success: true,
      banners: banners,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

adminBannerRouter.delete(
  "/:bannerId",
  async (
    req: Request<{ bannerId: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const bannerId = req.params.bannerId;
      await deleteAdminBannerService(bannerId, req.user.id);
      // ...
      res.status(200).json({
        success: true,
        msg: "Document deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
);
