import { Router } from "express";
import { forgotPasswordController, refreshTokenController, resetPassword, updateUserDetails, uploadAvatar, userDetails, userLoginController, userLogoutController, userRegisterController, verifyForgotPasswordOtp } from "../controllers/user.controller.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const userRouter = Router()

userRouter.post("/register", userRegisterController)
userRouter.post("/login", userLoginController)
userRouter.get("/logout", auth, userLogoutController)
userRouter.put("/upload-avatar", auth, upload.single('avatar'), uploadAvatar)
userRouter.put("/update-user", auth, updateUserDetails)
userRouter.put("/forgot-password",forgotPasswordController)
userRouter.put("/verify-forgot-password-otp", verifyForgotPasswordOtp)
userRouter.put("/reset-password", resetPassword)
userRouter.post("/refresh-token", refreshTokenController)
userRouter.get("/user-details", auth, userDetails)

export default userRouter