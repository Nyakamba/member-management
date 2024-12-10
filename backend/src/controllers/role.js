import { prisma } from "../db.js";
export const createRole = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingRole = await prisma.role.findUnique({
      where: {
        name: name,
      },
    });

    if (existingRole) {
      return res.status(400).json({ message: "Role already exists" });
    }

    const role = await prisma.role.create({
      data: {
        name: name,
      },
    });

    res.status(200).json({ message: "Role created successfully", role });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
