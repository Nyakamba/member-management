import express from "express";
import { prisma } from "../db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlware/auth.js";

const router = express.Router();

// router.get("/me", verifyToken, async (req: Request, res: Response) => {
//   const userId = req.userId;

//   try {
//     const user = await User.findById(userId).select("-password");
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "something went wrong" });
//   }
// });

router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRole = role || "user";

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: {
          connectOrCreate: {
            where: { name: userRole },
            create: { name: userRole },
          },
        },
      },
    });
    const token = generateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    return res.status(201).json({ user, message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

export default router;
