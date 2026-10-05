import { Worker } from "bullmq";
import { deleteBannerFromCloudinary } from "../lib/cloudinary.js";
import { bullmqConnection } from "../lib/bullmq.js";
import { error } from "node:console";
import { logger } from "../lib/logger.js";

export const worker = new Worker(
  "cloudinaryDeletQueue",
  async (job) => {
    if (job.name === "delete-image") {
      const { public_id } = job.data;
      console.log(`Deleting cloudinary image with id ${public_id}`);
      await deleteBannerFromCloudinary(public_id);
      console.log("Image deleted");
    }
  },
  { connection: bullmqConnection },
);

worker.on("completed", (job) => {
  console.log(`job with ${job.id} completed`);
});

worker.on("failed", (job, error) => {
  console.log(`Error while completing job ${job?.id}`);
  console.log(error);
});

logger.info("Deletion of image started");
