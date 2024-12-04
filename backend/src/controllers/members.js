import { prisma } from "../db.js";

export const getMembers = async (req, res) => {
  try {
    const members = await prisma.member.findMany();
    res.status(200).json({ members });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const addMember = async (req, res) => {
  const { name, email, dob, roleId } = req.body;

  const profilePicture = req.file?.filename;

  if (!name || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    let member = await prisma.member.findUnique({
      where: {
        email,
      },
    });

    if (member) {
      return res.status(400).json({ message: "Member already exists" });
    }

    member = await prisma.member.create({
      data: {
        name,
        email,
        dob: dob ? new Date(dob) : undefined,
        roleId: Number(roleId) || 1,
        profilePicture: profilePicture || "car.jpg",
        userId: req.userId,
      },
      include: {
        role: true,
      },
    });
    res.status(201).json({ member });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
