import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "uuhufhuioeiidfjqyiu157yt3febhbdf";

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export { generateToken, verifyToken };
