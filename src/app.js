import express from "express";
import authRoutes from "./routes/authRoutes.js";
import issueRoutes  from "./routes/issueRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";
import viewRoutes from "./routes/viewRoutes.js";

export const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", viewRoutes);

app.use("/api/issues",issueRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/issues", commentRoutes);
app.use(errorHandler);

export default app;