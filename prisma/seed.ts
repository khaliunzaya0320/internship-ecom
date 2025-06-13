import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user үүсгэх эсвэл шинэчлэх
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "gantulga.ts@skytel.mn" },
    update: {
      name: "Gantulga Ts",
      password: hashedPassword,
      role: "ADMIN",
      phone: "99887766",
    },
    create: {
      email: "gantulga.ts@skytel.mn",
      name: "Gantulga Ts",
      password: hashedPassword,
      role: "ADMIN",
      phone: "99887766",
    },
  });

  // Sample user үүсгэх эсвэл шинэчлэх
  const userPassword = await bcrypt.hash("user123", 12);
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {
      name: "Test User",
      password: userPassword,
      role: "USER",
      phone: "88776655",
    },
    create: {
      email: "user@example.com", 
      name: "Test User",
      password: userPassword,
      role: "USER",
      phone: "88776655",
    },
  });
  // Categories - хэрэв байхгүй бол үүсгэх
  const skincare = await prisma.category.upsert({
    where: { id: 1 },
    update: {},
    create: { name: "Skincare" },
  });

  const makeup = await prisma.category.upsert({
    where: { id: 2 },
    update: {},
    create: { name: "Makeup" },
  });

  const fragrance = await prisma.category.upsert({
    where: { id: 3 },
    update: {},
    create: { name: "Fragrance" },
  });
  // Admin-ийн хаягуудыг устгаад дахин үүсгэх
  await prisma.address.deleteMany({
    where: { userId: admin.id }
  });

  // Sample addresses үүсгэх
  const addresses = await prisma.address.createMany({
    data: [
      {
        userId: admin.id,
        title: "Гэр",
        fullName: "Gantulga Ts",
        phone: "99887766",
        address: "1-р хороо, 15-р байр, 45 тоот",
        city: "Улаанбаатар",
        district: "Сүхбаатар дүүрэг",
        isDefault: true,
      },
      {
        userId: admin.id,
        title: "Ажлын газар",
        fullName: "Gantulga Ts",
        phone: "99887766", 
        address: "Офис 402, Зүүн 4 зам",
        city: "Улаанбаатар",
        district: "Чингэлтэй дүүрэг",
        isDefault: false,
      },
      {
        userId: user.id,
        title: "Гэр",
        fullName: "Test User",
        phone: "88776655",
        address: "2-р хороо, 8-р байр, 22 тоот",
        city: "Улаанбаатар", 
        district: "Баянзүрх дүүрэг",
        isDefault: true,
      },
    ],
  });

  // Sample products үүсгэх
  const products = await prisma.product.createMany({
    data: [
      {
        name: "Premium Moisturizer",
        categoryId: skincare.id,
        description: "Арьсыг чийгшүүлэгч тос",
        price: 45000,
        stock: 100,
        imageUrl: "/product1.webp",
      },
      {
        name: "Vitamin C Serum",
        categoryId: skincare.id,
        description: "Витамин C серум",
        price: 35000,
        stock: 50,
        imageUrl: "/product1.webp",
      },
      {
        name: "Gentle Cleanser",
        categoryId: skincare.id,
        description: "Зөөлөн цэвэрлэгч",
        price: 25000,
        stock: 75,
        imageUrl: "/product1.webp",
      },
      {
        name: "Hydrating Toner",
        categoryId: skincare.id,
        description: "Чийгшүүлэгч тонер",
        price: 30000,
        stock: 60,
        imageUrl: "/product1.webp",
      },
      {
        name: "Foundation",
        categoryId: makeup.id,
        description: "Суурь будаг",
        price: 55000,
        stock: 40,
        imageUrl: "/product1.webp",
      },
      {
        name: "Lipstick",
        categoryId: makeup.id,
        description: "Уруулын будаг",
        price: 20000,
        stock: 80,
        imageUrl: "/product1.webp",
      },
      {
        name: "Eau de Parfum",
        categoryId: fragrance.id,
        description: "Үнэртэн",
        price: 85000,
        stock: 30,
        imageUrl: "/product1.webp",
      },
      {
        name: "Body Mist",
        categoryId: fragrance.id,
        description: "Биеийн үнэртэн",
        price: 35000,
        stock: 45,
        imageUrl: "/product1.webp",
      },
    ],
  });

  // Get created products for sample orders
  const allProducts = await prisma.product.findMany();

  // Sample orders үүсгэх
  const order1 = await prisma.order.create({
    data: {
      userId: admin.id,
      total: 80000,
      status: "DELIVERED",
      items: {
        create: [
          {
            productId: allProducts[0].id, // Premium Moisturizer
            quantity: 1,
            price: 45000,
          },
          {
            productId: allProducts[1].id, // Vitamin C Serum
            quantity: 1,
            price: 35000,
          },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: user.id,
      total: 75000,
      status: "PENDING",
      items: {
        create: [
          {
            productId: allProducts[2].id, // Gentle Cleanser
            quantity: 1,
            price: 25000,
          },
          {
            productId: allProducts[4].id, // Foundation
            quantity: 1,
            price: 55000,
          },
        ],
      },
    },
  });

  // Sample wishlist үүсгэх
  await prisma.wishlist.createMany({
    data: [
      {
        userId: admin.id,
        productId: allProducts[3].id, // Hydrating Toner
      },
      {
        userId: admin.id,
        productId: allProducts[6].id, // Eau de Parfum
      },
      {
        userId: user.id,
        productId: allProducts[1].id, // Vitamin C Serum
      },
      {
        userId: user.id,
        productId: allProducts[5].id, // Lipstick
      },
    ],
  });

  // Sample viewed products үүсгэх
  await prisma.viewedProduct.createMany({
    data: [
      {
        userId: admin.id,
        productId: allProducts[0].id,
        viewedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      },
      {
        userId: admin.id,
        productId: allProducts[2].id,
        viewedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        userId: user.id,
        productId: allProducts[4].id,
        viewedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      },
      {
        userId: user.id,
        productId: allProducts[7].id,
        viewedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      },
    ],
  });

  console.log({ 
    admin, 
    user, 
    skincare, 
    makeup, 
    fragrance, 
    addresses, 
    products, 
    order1, 
    order2 
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
