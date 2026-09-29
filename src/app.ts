// entry for express file and it is for express related logic

import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import { apiRouter } from "./routes/index.js";
export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); //used to parse url encoded form data
  app.use("/api/v1", apiRouter);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
