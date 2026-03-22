import Issue from "../models/Issue.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";

export const canModifyIssue = asyncHandler(async (req, res, next) => {

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
        return next(new AppError("Issue not found", 404));
    }

    const isCreator =
        issue.createdBy.toString() === req.user._id.toString();

    const isAssigned =
        issue.assignedTo?.toString() === req.user._id.toString();

    if (!isAssigned && !isCreator) {
        return next(new AppError("Not authorized to modify this issue", 403));
    }

    req.issue = issue;

    next();
});