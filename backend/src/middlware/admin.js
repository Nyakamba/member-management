const isAdmin = (req, res, next) => {
  if (req.role === "admin") {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default isAdmin;
