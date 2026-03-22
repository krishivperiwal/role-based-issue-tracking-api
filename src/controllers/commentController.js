import Comment from "../models/Comment.js";
import Issue from "../models/Issue.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";

export const addComment = asyncHandler(async (req, res, next) => {

    const { text } = req.body;
    const { issueId } = req.params;

    if (!text) {
        return next(new AppError("Comment text is required", 400));
    }

    const issue = await Issue.findById(issueId);

    if (!issue) {
        return next(new AppError("Issue not found", 404));
    }

    const comment = await Comment.create({
        text,
        issue: issueId,
        createdBy: req.user._id,
    });

    res.status(201).json(comment);
});

export const getIssueComments = asyncHandler(async (req, res, next) => {

    const { issueId } = req.params;

    const comments = await Comment.find({ issue: issueId })
        .populate("createdBy", "name email")
        .sort({ createdAt: -1 });

    res.status(200).json(comments);
});

export const deleteComment = asyncHandler(async (req, res, next) => {

    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
        return next(new AppError("Comment not found", 404));
    }

    await comment.deleteOne();

    res.status(200).json({ message: "Comment deleted successfully" });
});