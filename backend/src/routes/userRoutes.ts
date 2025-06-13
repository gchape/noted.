import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register new user
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists." });
    }

    const newUser = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    const { password: _, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json({
      success: true,
      user: userWithoutPassword,
      message: "Registration successful.",
    });
  })
);

// Login user
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: user._id }, jwtSecret!, {
      expiresIn: "30d",
    });

    const { password: _, ...userWithoutPassword } = user.toObject();
    res.json({
      success: true,
      message: "Login successful.",
      user: userWithoutPassword,
      token,
    });
  })
);

// Get current user profile
router.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.json({ success: true, user });
  })
);

export default router;
