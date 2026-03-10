import express from "express"
import isAuth from "../middleware/isAuth.js";
import { getCurrentUser, updateProfile } from "../controller/userController.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.get("/getcurrentuser", isAuth, getCurrentUser)
userRouter.post("/profile", isAuth, upload.single("photoUrl"),updateProfile)
//userId comes from isAuth
//upload.single("photoUrl") is from multer origional photo saves in public folder and uploadOnCloudinary is from cloudinary
//updateProfile is from userController
export default userRouter 