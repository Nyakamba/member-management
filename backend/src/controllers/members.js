import { prisma } from "../db.js";

export const getMembers = async (req, res) => {
  const {
    search,
    page = 1,
    limit = 10,
    sortField = "name",
    sortOrder = "asc",
  } = req.query;

  try {
    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const members = await prisma.member.findMany({
      where,
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      orderBy: {
        [sortField]: sortOrder === "asc" ? "asc" : "desc",
      },
      include: {
        role: true,
      },
    });

    const totalMembers = await prisma.member.count({
      where,
    });

    if (!members) {
      return res.status(404).json({ message: "Members not found" });
    }

    res.status(200).json({
      members,
      totalMembers,
      totalPages: Math.ceil(totalMembers / pageSize),
      currentPage: pageNumber,
    });
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

    await prisma.activityLog.create({
      data: {
        action: "Created member",
        userId: req.userId,
      },
    });

    res.status(201).json({ member });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating member" });
  }
};

export const updateMember = async (req, res) => {
  const memberId = parseInt(req.params.id);
  const { name, email, dob, roleId } = req.body;

  const profilePicture = req.file?.filename;

  if (!name || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    let member = await prisma.member.findUnique({
      where: {
        id: memberId,
      },
    });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    member = await prisma.member.update({
      where: {
        id: memberId,
      },
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

    await prisma.activityLog.create({
      data: {
        action: "Updated member",
        userId: req.userId,
      },
    });

    res.status(200).json({ member });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating member" });
  }
};

export const deleteMember = async (req, res) => {
  const memberId = parseInt(req.params.id);

  try {
    const member = await prisma.member.findUnique({
      where: {
        id: memberId,
      },
    });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    await prisma.member.delete({
      where: {
        id: memberId,
      },
    });

    await prisma.activityLog.create({
      data: {
        action: "Deleted member",
        userId: req.userId,
      },
    });

    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting member" });
  }
};

export const getMember = async (req, res) => {
  const memberId = parseInt(req.params.id);

  try {
    const member = await prisma.member.findUnique({
      where: {
        id: memberId,
      },
      include: {
        role: true,
      },
    });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json({ member });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
