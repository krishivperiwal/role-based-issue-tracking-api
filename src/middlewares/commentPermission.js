import Comment from "../models/Comment.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";

export const isCommentOwner = asyncHandler(async (req, res, next) => {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return next(new AppError("Comment not found", 404));
    }

    if (req.user.role === "admin") {
      return next();
    }
    
    if (comment.createdBy.toString() !== req.user._id.toString()) {
      return next(new AppError("Not authorized", 403));
    }

    next();
});