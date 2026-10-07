import { AppError } from "../error/AppError.js";
import { uploadBannerToCloudinary } from "../lib/cloudinary.js";
import { Banner } from "../types/file_uploadTypes.js";
import {
  createAdminBannerRepo,
  getAdminBannersRepo,
  deleteAdminBannerRepo,
} from "../repositories/admin.banner.repository.js";
import { redisClient } from "../redis/redis.js";
import { createAdminBannerKey } from "../lib/cacheKeys.js";
import { invalidBannerCache } from "./cache.service.js";
import { addingJobs } from "../queue/deleteCloudinaryImage.js";

export async function createAdminBannerService(
  file: Express.Multer.File | undefined,
  user_id: string,
): Promise<Banner | null> {
  if (!file) {
    throw new AppError(400, "Image is required");
  }
  if (!file.buffer) {
    throw new AppError(400, "Image type is invalid");
  }

  const { secure_url, public_id } = await uploadBannerToCloudinary(
    file.buffer,
    {
      folder: "node-js-capestone-project",
    },
  );

  if (!secure_url || !public_id) {
    throw new AppError(500, "cloudinary app error");
  }

  //store this into db
  const banner = await createAdminBannerRepo(secure_url, public_id, user_id);
  const cacheKey = createAdminBannerKey(user_id);
  await invalidBannerCache(cacheKey);
  return banner;
}

export async function getAdminBannerService(
  user_id: string,
): Promise<Banner[] | null> {
  const cacheKey = createAdminBannerKey(user_id);
  const cachedBanners = await redisClient.get(cacheKey);
  if (cachedBanners) {
    console.log("cache hit");
    return JSON.parse(cachedBanners);
  }
  console.log("cache miss");
  const banners = await getAdminBannersRepo(user_id);
  await redisClient.set(cacheKey, JSON.stringify(banners), { EX: 60 * 5 });
  return banners;
}

export async function deleteAdminBannerService(
  bannerId: string,
  user_id: string,
): Promise<void> {
  const cloudinary_unique_id = await deleteAdminBannerRepo(bannerId);
  if (!cloudinary_unique_id) {
    throw new AppError(404, "Banner not found");
  }
  console.log("Banner deleted from db");
  //clear the cache
  const cacheKey = createAdminBannerKey(user_id);
  await invalidBannerCache(cacheKey);
  await addingJobs(cloudinary_unique_id);
  //add a bullmq job
}
