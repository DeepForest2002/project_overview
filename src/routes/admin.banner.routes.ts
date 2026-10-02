import { Router } from "express";
import { authentication } from "../middleware/auth.middleware.js";
import { AdminMiddleware } from "../middleware/admin.middleware.js";
import { uploadSingleBannerImage } from "../middleware/banner.middleware.js";
import {
  createAdminBannerService,
  getAdminBannerService,
} from "../services/admin.banner.service.js";

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
      success: false,
      banners: banners,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
