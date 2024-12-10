import express from "express";
import { createRole, getAllRoles } from "../controllers/role.js";
import isAdmin from "../middlware/admin.js";
import { verifyToken } from "../middlware/auth.js";

const router = express.Router();

router.get("/", verifyToken, isAdmin, getAllRoles);

router.post("/", verifyToken, isAdmin, createRole);

export default router;
