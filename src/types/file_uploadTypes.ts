export type uploadResult = {
  secure_url: string;
  public_id: string;
};

export type Banner = {
  id: string;
  image_url: string;
  cloudinary_unique_id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
};
