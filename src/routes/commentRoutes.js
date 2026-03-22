import express from "express";
import { addComment, getIssueComments, deleteComment } from "../controllers/commentController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { isCommentOwner } from "../middlewares/commentPermission.js";

const router = express.Router();

router.delete("/comments/:commentId", protect, authorizeRoles("user", "admin"), isCommentOwner, deleteComment);
router.post("/:issueId/comments", protect, authorizeRoles("user", "admin"), addComment);
router.get("/:issueId/comments", protect, authorizeRoles("user", "admin"), getIssueComments);

export default router;
