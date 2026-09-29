import express, { Router } from "express";
import { authentication } from "../middleware/auth.middleware.js";
import {
  CreateUserTask,
  getAllUserTasks,
  getTask,
} from "../services/user.task.service.js";
import { success } from "zod";
import { UUID } from "node:crypto";
import { RateLimiter } from "../middleware/ratelimit.middleware.js";
export const userTaskRouter = Router();

userTaskRouter.use(authentication);
userTaskRouter.use(RateLimiter);

//all the routes below this are protected

userTaskRouter.post("/", async (req, res, next) => {
  try {
    const task = await CreateUserTask(req.user.id, req.body.title);
    res.status(201).json({
      success: true,
      task: task,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//fetching all the tasks
userTaskRouter.get("/", async (req, res, next) => {
  try {
    const user_tasks = await getAllUserTasks(req.user.id);
    res.status(200).json({
      success: true,
      tasks: user_tasks,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//get a particular task / dynamic id
userTaskRouter.get("/:taskId", async (req, res, next) => {
  try {
    const taskId: string = req.params.taskId;
    const task = await getTask(taskId, req.user.id);
    res.status(200).json({
      msg: true,
      data: { task },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
