import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";

export const authorizeRoles = (...allowedRoles) => {
    return asyncHandler(async (req, res, next) => {
        if (!req.user) {
            return next(new AppError("Not authorized", 401));
        }

        const userRole = req.user.role || "user";

        if (!allowedRoles.includes(userRole)) {
            return next(new AppError("Access denied", 403));
        }

        next();
    });
};