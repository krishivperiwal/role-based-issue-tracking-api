import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { canModifyIssue } from "../middlewares/permissionMiddleware.js";
import { createIssue, getMyIssues, updateIssue } from "../controllers/issueController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("user", "admin"), createIssue);
router.get("/", protect, authorizeRoles("user", "admin"), getMyIssues);
router.put("/:id", protect, authorizeRoles("user", "admin"), canModifyIssue, updateIssue);

export default router;