import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "uuhufhuioeiidfjqyiu157yt3febhbdf";

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "1d" });
};

const verifyToken = (req, res, next) => {
  const token = req.cookies["token"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.userId;

    req.role = decoded.role;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export { generateToken, verifyToken };
