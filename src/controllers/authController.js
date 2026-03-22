import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    throw new AppError("Name, email and password are required", 400);
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new AppError("User already exists", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user),
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    throw new AppError("Invalid credentials", 401);
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user),
  });
});

export const getUsersForAssignment = asyncHandler(async (req, res, next) => {
  const users = await User.find({}, "name email role").sort({ name: 1 });
  res.status(200).json(users);
});