/** @format */
import express from "express";
import { registerUser, signInUser } from "../controllers/userController.js"; // Ensure these functions exist

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/signin", signInUser);

export default userRouter;
