import express from "express";
import { verifyToken } from "../middlware/auth.js";
import {
  register,
  login,
  logout,
  getUser,
  validateToken,
} from "../controllers/auth.js";

const router = express.Router();

router.get("/validate-token", verifyToken, validateToken);

router.get("/me", verifyToken, getUser);

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

export default router;
