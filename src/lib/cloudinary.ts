import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env.js";
import { AppError } from "../error/AppError.js";
type uploadResult = {
  secureUrl: string;
  publicId: string;
};

export async function uploadBannerToCloudinary(
  buffer: Buffer,
  options?: { folder?: string },
): Promise<uploadResult> {
  const cloudName = env.cloudinary_name;
  const cloudinary_api_key = env.cloudinary_api_key;
  const cloudinary_api_secret = env.cloudinary_api_secret;

  if (!cloudName || !cloudinary_api_key || !cloudinary_api_secret) {
    throw new AppError(500, "Cloudinary Configs are not correct");
  }

  //configure
  cloudinary.config({
    cloud_name: cloudName,
    api_key: cloudinary_api_key,
    api_secret: cloudinary_api_secret,
  });
}
