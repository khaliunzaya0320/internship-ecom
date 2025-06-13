import { PrismaClient } from '../src/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // Admin user үүсгэх эсвэл шинэчлэх
    const hashedPassword = await bcrypt.hash('admin123', 12);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@test.mn' },
        update: {
            name: 'Gantulga Ts',
            password: hashedPassword,
            role: 'ADMIN',
            phone: '99887766',
        },
        create: {
            email: 'admin@test.mn',
            name: 'Gantulga Ts',
            password: hashedPassword,
            role: 'ADMIN',
            phone: '99887766',
        },
    });

    // Sample user үүсгэх эсвэл шинэчлэх
    const userPassword = await bcrypt.hash('user123', 12);
    const user = await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {
            name: 'Test User',
            password: userPassword,
            role: 'USER',
            phone: '88776655',
        },
        create: {
            email: 'user@example.com',
            name: 'Test User',
            password: userPassword,
            role: 'USER',
            phone: '88776655',
        },
    });
    // Categories - хэрэв байхгүй бол үүсгэх
    const skincare = await prisma.category.upsert({
        where: { id: 1 },
        update: {
            featured: true,
            description: 'Арьс арчилгааны бүтээгдэхүүн',
        },
        create: {
            name: 'Skincare',
            featured: true,
            description: 'Арьс арчилгааны бүтээгдэхүүн',
        },
    });

    const makeup = await prisma.category.upsert({
        where: { id: 2 },
        update: {
            featured: true,
            description: 'Гоо сайханы бүтээгдэхүүн',
        },
        create: {
            name: 'Makeup',
            featured: true,
            description: 'Гоо сайханы бүтээгдэхүүн',
        },
    });

    const fragrance = await prisma.category.upsert({
        where: { id: 3 },
        update: {
            featured: true,
            description: 'Үнэртэн ба дэгдэмхий',
        },
        create: {
            name: 'Fragrance',
            featured: true,
            description: 'Үнэртэн ба дэгдэмхий',
        },
    });

    // Additional categories
    const technology = await prisma.category.upsert({
        where: { id: 4 },
        update: {
            featured: true,
            description: 'Технологийн бүтээгдэхүүн',
        },
        create: {
            name: 'Технологи',
            featured: true,
            description: 'Технологийн бүтээгдэхүүн',
        },
    });

    const fashion = await prisma.category.upsert({
        where: { id: 5 },
        update: {
            featured: true,
            description: 'Хувцас загварын салбар',
        },
        create: {
            name: 'Хувцас',
            featured: true,
            description: 'Хувцас загварын салбар',
        },
    });

    const sports = await prisma.category.upsert({
        where: { id: 6 },
        update: {
            featured: true,
            description: 'Спорт болон фитнесс',
        },
        create: {
            name: 'Спорт',
            featured: true,
            description: 'Спорт болон фитнесс',
        },
    });

    // Non-featured categories
    const home = await prisma.category.upsert({
        where: { id: 7 },
        update: {
            featured: false,
            description: 'Гэр ахуйн бүтээгдэхүүн',
        },
        create: {
            name: 'Гэр ахуй',
            featured: false,
            description: 'Гэр ахуйн бүтээгдэхүүн',
        },
    });

    const health = await prisma.category.upsert({
        where: { id: 8 },
        update: {
            featured: false,
            description: 'Эрүүл мэндийн бүтээгдэхүүн',
        },
        create: {
            name: 'Эрүүл мэнд',
            featured: false,
            description: 'Эрүүл мэндийн бүтээгдэхүүн',
        },
    });
    // Admin-ийн хаягуудыг устгаад дахин үүсгэх
    await prisma.address.deleteMany({
        where: { userId: admin.id },
    });

    // Sample addresses үүсгэх
    const addresses = await prisma.address.createMany({
        data: [
            {
                userId: admin.id,
                title: 'Гэр',
                fullName: 'Gantulga Ts',
                phone: '99887766',
                address: '1-р хороо, 15-р байр, 45 тоот',
                city: 'Улаанбаатар',
                district: 'Сүхбаатар дүүрэг',
                isDefault: true,
            },
            {
                userId: admin.id,
                title: 'Ажлын газар',
                fullName: 'Gantulga Ts',
                phone: '99887766',
                address: 'Офис 402, Зүүн 4 зам',
                city: 'Улаанбаатар',
                district: 'Чингэлтэй дүүрэг',
                isDefault: false,
            },
            {
                userId: user.id,
                title: 'Гэр',
                fullName: 'Test User',
                phone: '88776655',
                address: '2-р хороо, 8-р байр, 22 тоот',
                city: 'Улаанбаатар',
                district: 'Баянзүрх дүүрэг',
                isDefault: true,
            },
        ],
    });

    // Sample products үүсгэх
    const products = await prisma.product.createMany({
        data: [
            {
                name: 'Premium Moisturizer',
                categoryId: skincare.id,
                description: 'Арьсыг чийгшүүлэгч тос',
                price: 45000,
                stock: 100,
                imageUrl: '/product1.webp',
            },
            {
                name: 'Vitamin C Serum',
                categoryId: skincare.id,
                description: 'Витамин C серум',
                price: 35000,
                stock: 50,
                imageUrl: '/product1.webp',
            },
            {
                name: 'Gentle Cleanser',
                categoryId: skincare.id,
                description: 'Зөөлөн цэвэрлэгч',
                price: 25000,
                stock: 75,
                imageUrl: '/product1.webp',
            },
            {
                name: 'Hydrating Toner',
                categoryId: skincare.id,
                description: 'Чийгшүүлэгч тонер',
                price: 30000,
                stock: 60,
                imageUrl: '/product1.webp',
            },
            {
                name: 'Foundation',
                categoryId: makeup.id,
                description: 'Суурь будаг',
                price: 55000,
                stock: 40,
                imageUrl: '/product1.webp',
            },
            {
                name: 'Lipstick',
                categoryId: makeup.id,
                description: 'Уруулын будаг',
                price: 20000,
                stock: 80,
                imageUrl: '/product1.webp',
            },
            {
                name: 'Eau de Parfum',
                categoryId: fragrance.id,
                description: 'Үнэртэн',
                price: 85000,
                stock: 30,
                imageUrl: '/product1.webp',
            },
            {
                name: 'Body Mist',
                categoryId: fragrance.id,
                description: 'Биеийн үнэртэн',
                price: 35000,
                stock: 45,
                imageUrl: '/product1.webp',
            },
        ],
    });

    // Sample sliders үүсгэх
    await prisma.slider.createMany({
        data: [
            {
                title: 'Premium Skincare Collection',
                description:
                    'Discover our premium skincare products for healthy, glowing skin',
                imageUrl:
                    'https://cdn.shopify.com/s/files/1/1074/9876/files/axis-y-heartleaf-my-type-calming-cream-main-2_1024x1024_1080x_dbed1972-a0ba-4fa9-b809-57769b2bed53.webp?v=1729034961',
                linkUrl: '/shop/products?categoryId=1',
                isActive: true,
                order: 1,
            },
            {
                title: 'Makeup Essentials',
                description:
                    'Complete your look with our premium makeup collection',
                imageUrl:
                    'https://glowtime.mu/wp-content/uploads/2022/03/axis-y-daily-purifying-treatment-toner.png',
                linkUrl: '/shop/products?categoryId=2',
                isActive: true,
                order: 2,
            },
            {
                title: 'Luxury Fragrances',
                description: 'Experience our exquisite fragrance collection',
                imageUrl:
                    'https://www.axis-y.com/cdn/shop/files/Glow_Cream.png?v=1730435480',
                linkUrl: '/shop/products?categoryId=3',
                isActive: true,
                order: 3,
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
            status: 'DELIVERED',
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
            status: 'PENDING',
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
    await prisma.viewedProduct.upsert({
        where: {
            userId_productId: {
                userId: admin.id,
                productId: allProducts[0].id,
            },
        },
        update: {
            viewedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        },
        create: {
            userId: admin.id,
            productId: allProducts[0].id,
            viewedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        },
    });

    await prisma.viewedProduct.upsert({
        where: {
            userId_productId: {
                userId: admin.id,
                productId: allProducts[2].id,
            },
        },
        update: {
            viewedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        },
        create: {
            userId: admin.id,
            productId: allProducts[2].id,
            viewedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        },
    });

    await prisma.viewedProduct.upsert({
        where: {
            userId_productId: {
                userId: user.id,
                productId: allProducts[4].id,
            },
        },
        update: {
            viewedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        },
        create: {
            userId: user.id,
            productId: allProducts[4].id,
            viewedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        },
    });

    await prisma.viewedProduct.upsert({
        where: {
            userId_productId: {
                userId: user.id,
                productId: allProducts[7].id,
            },
        },
        update: {
            viewedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        },
        create: {
            userId: user.id,
            productId: allProducts[7].id,
            viewedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        },
    });

    console.log({
        admin,
        user,
        categories: {
            skincare,
            makeup,
            fragrance,
            technology,
            fashion,
            sports,
            home,
            health,
        },
        addresses,
        products,
        order1,
        order2,
    });
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
