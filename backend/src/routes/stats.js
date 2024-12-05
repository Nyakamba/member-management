import express from "express";
import { getStats } from "../controllers/stats.js";
import isAdmin from "../middlware/admin.js";
import { verifyToken } from "../middlware/auth.js";

const router = express.Router();

router.get("/", verifyToken, isAdmin, getStats);

export default router;
