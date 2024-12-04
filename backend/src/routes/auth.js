import express from "express";
import { register, login, logout, getUser } from "../controllers/auth.js";
import { verifyToken } from "../middlware/auth.js";

const router = express.Router();

router.get("/me", verifyToken, getUser);

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

export default router;
