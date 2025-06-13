import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user үүсгэх
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.create({
    data: {
      email: "gantulga.ts@skytel.mn",
      name: "Gantulga Ts",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // Categories үүсгэх
  const categories = await prisma.category.createMany({
    data: [
      { name: "Skincare", description: "Арьс арчилгаа" },
      { name: "Makeup", description: "Гоо сайхны бүтээгдэхүүн" },
      { name: "Fragrance", description: "Үнэртэн" },
    ],
  });

  console.log({ admin, categories });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
