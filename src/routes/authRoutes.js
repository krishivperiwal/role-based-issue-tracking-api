import express from "express";
import { signup , login, getUsersForAssignment } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/users", protect, authorizeRoles("user", "admin"), getUsersForAssignment);

export default router;

