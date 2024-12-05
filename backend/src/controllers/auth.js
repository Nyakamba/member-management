import { prisma } from "../db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlware/auth.js";
import e from "express";

//get user
const getUser = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        role: true,
      },
    });
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

//gister user
const register = async (req, res) => {
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
      include: {
        role: true,
      },
    });

    const token = generateToken(user.id, user.role.name);

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
};

//user login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id, user.role.name);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    return res
      .status(200)
      .json({ user, message: "User logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const validateToken = async (req, res) => {
  res.status(200).send({ userId: req.userId });
};

//user logout
const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    return res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

export { register, login, logout, getUser, validateToken };
