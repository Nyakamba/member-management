import { prisma } from "../db.js";

export const getActivities = async (req, res) => {
  try {
    const activityCount = await prisma.activityLog.groupBy({
      by: ["action"],
      _count: {
        action: true,
      },
    });

    res
      .status(200)
      .json({
        success: true,
        data: activityCount.map((act) => ({
          action: act.action,
          count: act._count.action,
        })),
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
