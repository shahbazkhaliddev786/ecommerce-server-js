import { Router } from "express";
import { 
    registerUser, 
    loginUser, 
    verifyUser, 
    myProfile 
} from "../controller/user.controller.js";
import { Auth } from "../middleware/auth.js";

const userRouter = Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/verify-otp", verifyUser)
userRouter.get("/profile", Auth, myProfile)

export default userRouter