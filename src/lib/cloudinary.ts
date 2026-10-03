import { v2 as cloudinary } from "cloudinary";
import { AppError } from "../error/AppError.js";
import { uploadResult } from "../types/file_uploadTypes.js";
import dotenv from "dotenv";
dotenv.config();

export async function uploadBannerToCloudinary(
  buffer: Buffer,
  options?: { folder?: string },
): Promise<uploadResult> {
  const cloudName = process.env.CLOUDINARY_NAME;
  const cloudinary_api_key = process.env.CLOUDINARY_API_KEY;
  const cloudinary_api_secret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !cloudinary_api_key || !cloudinary_api_secret) {
    throw new AppError(500, "Cloudinary Configs are not correct");
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: cloudinary_api_key,
    api_secret: cloudinary_api_secret,
  });

  return new Promise<uploadResult>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        ...(options?.folder ? { folder: options.folder } : {}),
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result) {
          reject(new AppError(500, "Cloudinary returned no result"));
          return;
        }
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      },
    );

    // send raw image bytes to Cloudinary
    uploadStream.end(buffer);
  });
}

export async function deleteBannerFromCloudinary(
  public_id: string,
): Promise<void> {
  const cloudName = process.env.CLOUDINARY_NAME;
  const cloudinary_api_key = process.env.CLOUDINARY_API_KEY;
  const cloudinary_api_secret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !cloudinary_api_key || !cloudinary_api_secret) {
    throw new AppError(500, "Cloudinary Configs are not correct");
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: cloudinary_api_key,
    api_secret: cloudinary_api_secret,
  });

  await cloudinary.uploader.destroy(public_id);
}
