import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Бүх бүтээгдэхүүний тоо
        const totalProducts = await prisma.product.count();

        // Бүх захиалгын тоо
        const totalOrders = await prisma.order.count();

        // Шинэ захиалгын тоо (сүүлийн 30 хоногт)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const newOrders = await prisma.order.count({
            where: {
                createdAt: {
                    gte: thirtyDaysAgo,
                },
            },
        }); // Хүргэлтэнд гарсан захиалгын тоо
        const shippedOrders = await prisma.order.count({
            where: {
                status: 'PENDING',
            },
        });

        // Хүргэгдсэн захиалгын тоо
        const deliveredOrders = await prisma.order.count({
            where: {
                status: 'DELIVERED',
            },
        });

        // Бүх хэрэглэгчийн тоо
        const totalUsers = await prisma.user.count();

        // Захиалга хийсэн хэрэглэгчийн тоо
        const usersWithOrders = await prisma.user.count({
            where: {
                orders: {
                    some: {},
                },
            },
        });

        // Захиалга хийж байгаагүй хэрэглэгчийн тоо
        const usersWithoutOrders = totalUsers - usersWithOrders;

        // Сүүлийн 7 хоногийн захиалгын статистик
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const weeklyOrders = await prisma.order.groupBy({
            by: ['createdAt'],
            where: {
                createdAt: {
                    gte: sevenDaysAgo,
                },
            },
            _count: {
                id: true,
            },
        });

        // Ангилал тус бүрийн бүтээгдэхүүний тоо
        const productsByCategory = await prisma.category.findMany({
            include: {
                _count: {
                    select: {
                        products: true,
                    },
                },
            },
        });

        // Хамгийн их захиалагдсан бүтээгдэхүүнүүд
        const topProducts = await prisma.orderItem.groupBy({
            by: ['productId'],
            _sum: {
                quantity: true,
            },
            _count: {
                id: true,
            },
            orderBy: {
                _sum: {
                    quantity: 'desc',
                },
            },
            take: 5,
        });

        // Бүтээгдэхүүний дэлгэрэнгүй мэдээлэл авах
        const topProductDetails = await Promise.all(
            topProducts.map(async (item) => {
                const product = await prisma.product.findUnique({
                    where: { id: item.productId },
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        imageUrl: true,
                    },
                });
                return {
                    ...product,
                    totalOrdered: item._sum.quantity,
                    orderCount: item._count.id,
                };
            }),
        );

        return NextResponse.json({
            totalProducts,
            totalOrders,
            newOrders,
            shippedOrders,
            deliveredOrders,
            totalUsers,
            usersWithOrders,
            usersWithoutOrders,
            weeklyOrders,
            productsByCategory,
            topProducts: topProductDetails,
        });
    } catch (error) {
        console.error('Dashboard API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch dashboard data' },
            { status: 500 },
        );
    }
}
