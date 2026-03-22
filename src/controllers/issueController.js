import Issue from "../models/Issue.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";

export const createIssue = asyncHandler(async (req, res, next) => {

    const { title, description } = req.body;

    if (!title || !description) {
        return next(new AppError("Title and description are required", 400));
    }

    const issue = await Issue.create({
        title,
        description,
        createdBy: req.user._id,
    });

    res.status(201).json(issue);
});

export const getMyIssues = asyncHandler(async (req, res, next) => {

    const filter = {
        $or: [
            { createdBy: req.user._id },
            { assignedTo: req.user._id }
        ]
    };

    if (req.query.status) {
        filter.status = req.query.status;
    }

    const issues = await Issue.find(filter)
        .populate("createdBy", "name email")
        .populate("assignedTo", "name email");

    res.status(200).json(issues);
});

export const updateIssue = asyncHandler(async (req, res, next) => {

    const { title, description, status, assignedTo } = req.body;

    const issue = req.issue;

    if (!issue) {
        return next(new AppError("Issue not found", 404));
    }

    if (title) issue.title = title;
    if (description) issue.description = description;
    if (status) issue.status = status;
    if (assignedTo !== undefined) {
        issue.assignedTo = assignedTo || undefined;
    }

    const updatedIssue = await issue.save();

    res.status(200).json(updatedIssue);
});