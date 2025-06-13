import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface Params {
    id: string;
}

// GET: Хэрэглэгчийн дэлгэрэнгүй мэдээлэл авах
export async function GET(
    request: Request,
    { params }: { params: Promise<Params> },
) {
    try {
        const session = await getServerSession(authOptions);
        const { id } = await params;

        if (!session || session.user?.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 },
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
            include: {
                orders: {
                    include: {
                        items: {
                            include: {
                                product: {
                                    select: {
                                        id: true,
                                        name: true,
                                        imageUrl: true,
                                        price: true,
                                    },
                                },
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                cartItems: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                imageUrl: true,
                                price: true,
                            },
                        },
                    },
                },
                wishlist: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                imageUrl: true,
                                price: true,
                            },
                        },
                    },
                },
                addresses: true,
                viewedProducts: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                imageUrl: true,
                                price: true,
                            },
                        },
                    },
                    orderBy: {
                        viewedAt: 'desc',
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 },
            );
        }

        // Calculate statistics
        const totalSpent = user.orders.reduce(
            (sum, order) => sum + order.total,
            0,
        );
        const totalOrders = user.orders.length;
        const cartItemsCount = user.cartItems.length;
        const wishlistCount = user.wishlist.length;

        return NextResponse.json({
            user: {
                ...user,
                password: undefined, // Remove password from response
            },
            stats: {
                totalSpent,
                totalOrders,
                cartItemsCount,
                wishlistCount,
            },
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        return NextResponse.json(
            { error: 'Failed to fetch user details' },
            { status: 500 },
        );
    }
}
