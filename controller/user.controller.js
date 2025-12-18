import { OTP } from "../models/otp.model.js";
import { User } from "../models/user.model.js";
import sendOtp from "../utils/send.otp.js";
import TryCatch from "../utils/try.catch.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerUser = TryCatch(async (req,res)=>{
  const {email, password} = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({email,password: hashedPassword,})
    res.json({newUser, message:"User registered successfully"})
  } catch (error) {
    throw new Error(error)
  }
})

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const subject = "Ecommerce App";
  const otp = Math.floor(100000 + Math.random() * 900000);

  const prevOtp = await OTP.findOne({ email });
  if (prevOtp) {
    await prevOtp.deleteOne();
  }

  await sendOtp({ email, subject, otp });

  await OTP.create({ email, otp });

  res.status(200).json({
    message: "OTP sent to your email",
  });
});

export const verifyUser = TryCatch(async (req, res) => {
  const { email, otp } = req.body;

  const haveOtp = await OTP.findOne({
    email,
    otp,
  });

  if (!haveOtp)
    return res.status(400).json({
      message: "Wrong otp",
    });

  let user = await User.findOne({ email });

  if (user) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SEC, {
      expiresIn: "15d",
    });

    await haveOtp.deleteOne();

    res.json({
      message: "User LoggedIn",
      token,
      user,
    });
  } else {
    user = await User.create({
      email,
    });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SEC, {
      expiresIn: "15d",
    });

    await haveOtp.deleteOne();

    res.json({
      message: "User LoggedIn",
      token,
      user,
    });
  }
});

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});
