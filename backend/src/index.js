import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import memberRoutes from "./routes/members.js";
import activityRoutes from "./routes/activity.js";
import statsRoutes from "./routes/stats.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/stats", statsRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
