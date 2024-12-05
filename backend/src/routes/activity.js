import express from "express";
import { getActivities } from "../controllers/activity.js";
import isAdmin from "../middlware/admin.js";
import { verifyToken } from "../middlware/auth.js";

const router = express.Router();

router.get("/", verifyToken, isAdmin, getActivities);

export default router;
