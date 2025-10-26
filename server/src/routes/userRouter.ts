import express from "express";
import UserController from "../controllers/userController";

const userController = new UserController();
const userRouter = express.Router();

// Rute untuk autentikasi
userRouter.get("/profile", userController.profile.bind(userController));
userRouter.post("/verify-otp", userController.verifyEmail);
userRouter.post("/resend-otp", userController.resendVerificationCode.bind(userController));
userRouter.post("/signup", userController.registerUser.bind(userController));
userRouter.post("/login", userController.loginUser.bind(userController));
userRouter.post("/logout", userController.logoutUser.bind(userController));

export default userRouter;