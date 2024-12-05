import { prisma } from "../db.js";

export const getStats = async (req, res) => {
  try {
    const totalMembers = await prisma.member.count();

    const totalUsers = await prisma.user.count();

    const totalActivityLogs = await prisma.activityLog.count();

    const adminCountForUsers = await prisma.user.count({
      where: {
        role: {
          name: "admin",
        },
      },
    });

    const userCountForUsers = await prisma.user.count({
      where: {
        role: {
          name: "user",
        },
      },
    });

    const adminCountForMembers = await prisma.member.count({
      where: {
        role: {
          name: "admin",
        },
      },
    });

    const userCountForMembers = await prisma.member.count({
      where: {
        role: {
          name: "user",
        },
      },
    });

    res.json({
      totalMembers,
      totalUsers,
      totalActivityLogs,
      adminCountForUsers,
      userCountForUsers,
      adminCountForMembers,
      userCountForMembers,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Error fetching stats." });
  }
};
