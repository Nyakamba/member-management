import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  // Seed roles
  const adminRole = await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: { name: "admin" },
  });

  const userRole = await prisma.role.upsert({
    where: { name: "user" },
    update: {},
    create: { name: "user" },
  });

  // Seed users
  const users = [];
  for (let i = 16; i <= 20; i++) {
    const role = i % 2 === 0 ? adminRole : userRole; // Alternate between Admin and User roles
    const user = await prisma.user.create({
      data: {
        email: `user${i}@example.com`,
        password: `password${i}`, // Replace with hashed passwords in production
        roleId: role.id,
      },
    });
    users.push(user);
  }

  // Seed members
  for (let i = 11; i <= 15; i++) {
    const user = users[i % users.length]; // Assign members to users cyclically
    const role = i % 2 === 0 ? adminRole : userRole; // Alternate between Admin and User roles
    await prisma.member.create({
      data: {
        name: `Member ${i}`,
        email: `member${i}@example.com`,
        dob: new Date(`1990-${String(i).padStart(2, "0")}-01`), // Generate unique DOBs
        profilePicture: null,
        userId: user.id,
        roleId: role.id,
      },
    });
  }

  console.log("Database seeded successfully with 10 users and 10 members!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
