import express from "express";
import { registerUser, loginUser, getUsersForAssignment } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, authorizeRoles("user", "admin"), getUsersForAssignment);

export default router;

