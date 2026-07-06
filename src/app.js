import express from "express";
import authRoutes from "./routes/authRoutes.js";
import issueRoutes  from "./routes/issueRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";
import viewRoutes from "./routes/viewRoutes.js";
import cors from 'cors';

export const app = express();
app.set('trust proxy', 1)

const allowedOrigins = [
  'http://localhost:5173',
  'https://role-tracker-client.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

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