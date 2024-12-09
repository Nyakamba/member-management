import { getActivities } from "./activity.js";
import { prisma } from "../db.js";
import { jest } from "@jest/globals";

jest.mock("../db.js", () => ({
  prisma: {
    activityLog: {
      findMany: jest.fn(),
    },
  },
}));

describe("getActivities", () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return activities with status 200", async () => {
    const mockActivities = [
      { id: 1, action: "Created user", createdAt: "2023-12-01" },
      { id: 2, action: "Deleted member", createdAt: "2023-12-02" },
    ];
    prisma.activityLog.findMany.mockImplementationOnce(() =>
      Promise.resolve(mockActivities)
    );

    await getActivities(mockReq, mockRes);

    expect(prisma.activityLog.findMany).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ activities: mockActivities });
  });

  test("should return 500 if an error occurs", async () => {
    prisma.activityLog.findMany.mockImplementationOnce(() =>
      Promise.reject(new Error("Database error"))
    );

    await getActivities(mockReq, mockRes);

    expect(prisma.activityLog.findMany).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "something went wrong",
    });
  });
});
