import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const candidateToken = authHeader.split(" ")[1]?.trim();

    if (candidateToken && candidateToken !== "undefined" && candidateToken !== "null") {
      token = candidateToken;
    }
  }

  if (!token) {
    throw new AppError("Not authorized, no token", 401);
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new AppError("Token invalid", 401);
  }

  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new AppError("User not found", 401);
  }

  req.user = user;
  next();
});