import express from "express";
import multer from "multer";
import path from "path";
import { verifyToken } from "../middlware/auth.js";
import isAdmin from "../middlware/admin.js";
import {
  addMember,
  getMembers,
  updateMember,
  deleteMember,
  getMember,
} from "../controllers/members.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", verifyToken, getMembers);

router.post(
  "/create",
  verifyToken,
  isAdmin,
  upload.single("profilePicture"),
  addMember
);

router.put(
  "/update/:id",
  verifyToken,
  isAdmin,
  upload.single("profilePicture"),
  updateMember
);

router.delete("/:id", verifyToken, isAdmin, deleteMember);

router.get("/:id", verifyToken, getMember);

export default router;
