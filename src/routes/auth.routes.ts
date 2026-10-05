import { Router } from "express";
import { LoginUser, registerUser } from "../services/auth.service.js";
import { authentication } from "../middleware/auth.middleware.js";
export const authRoutes = Router();

console.log("Inside auth");

authRoutes.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await registerUser(email, password);
    res.status(201).json({
      success: true,
      msg: "Registration successful, please log in to continue",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

authRoutes.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { accessToken } = await LoginUser(email, password);

    res.status(201).json({
      success: true,
      msg: {
        accessToken,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//get my current user information
//protect my routes
authRoutes.get("/me", authentication, (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: req.user,
    },
  });
});
