import { Banner } from "../types/file_uploadTypes.js";
import { pool } from "../lib/db.js";
export async function createAdminBannerRepo(
  imageUrl: string,
  public_id: string,
  user_id: string,
): Promise<Banner | null> {
  const result = await pool.query(
    `
        INSERT INTO banners(image_url, cloudinary_unique_id, user_id) VALUES ($1, $2, $3) RETURNING id, image_url, cloudinary_unique_id, user_id, created_at, updated_at
    `,
    [imageUrl, public_id, user_id],
  );

  return result.rows[0] ?? null;
}

export async function getAdminBannersRepo(
  user_id: string,
): Promise<Banner[] | null> {
  const banners = await pool.query(
    `SELECT id, image_url, cloudinary_unique_id, user_id, created_at, updated_at FROM banners WHERE user_id=$1 ORDER BY created_at DESC`,
    [user_id],
  );

  return banners.rows ?? null;
}

export async function deleteAdminBannerRepo(
  bannerId: string,
): Promise<string | null> {
  const result = await pool.query<{ cloudinary_unique_id: string }>(
    `DELETE FROM banners WHERE id=$1 RETURNING cloudinary_unique_id`,
    [bannerId],
  );
  return result.rows[0].cloudinary_unique_id ?? null;
}
