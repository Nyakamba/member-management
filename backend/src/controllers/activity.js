import { prisma } from "../db.js";

export const getActivities = async (req, res) => {
  try {
    const activities = await prisma.activityLog.findMany();
    res.status(200).json({ activities });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
