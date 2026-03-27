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
    createdBy: req.user._id
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
    throw new AppError("Issue not found", 404);
  }

  const isOwner = issue.createdBy.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";

  if (!isOwner && !isAdmin) {
    throw new AppError("Not authorized to update this issue", 403);
  }

  if (title !== undefined) issue.title = title;
  if (description !== undefined) issue.description = description;
  if (status !== undefined) issue.status = status;
  if (assignedTo !== undefined) {
    issue.assignedTo = assignedTo || undefined;
  }

  const updatedIssue = await issue.save();
  res.status(200).json(updatedIssue);
});