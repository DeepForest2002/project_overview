import { Queue } from "bullmq";
import { bullmqConnection } from "../lib/bullmq.js";

type DeleteCloudinaryImageJobData = {
  public_id: string;
};

export const cloudinaryQueue = new Queue("cloudinaryDeletQueue", {
  connection: bullmqConnection,
});

export async function addingJobs(public_id: string): Promise<void> {
  const jobData: DeleteCloudinaryImageJobData = { public_id };

  await cloudinaryQueue.add(
    "delete-image",
    { jobData },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 3000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    },
  );
}
