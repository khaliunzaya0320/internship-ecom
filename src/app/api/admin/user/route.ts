import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET: Хэрэглэгчдийн жагсаалт авах
export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user?.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 },
            );
        }

        const { searchParams } = new URL(request.url);
        const role = searchParams.get('role');
        const search = searchParams.get('search');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const skip = (page - 1) * limit;

        const where: any = {};

        if (role && role !== 'all') {
            where.role = role;
        }

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [users, totalCount] = await Promise.all([
            prisma.user.findMany({
                where,
                include: {
                    _count: {
                        select: {
                            orders: true,
                            cartItems: true,
                            wishlist: true,
                        },
                    },
                    orders: {
                        select: {
                            total: true,
                        },
                    },
                },
                orderBy: {
                    id: 'desc',
                },
                skip,
                take: limit,
            }),
            prisma.user.count({ where }),
        ]); // Calculate total spent for each user
        const usersWithStats = users.map((user: any) => ({
            ...user,
            totalSpent: user.orders.reduce(
                (sum: number, order: any) => sum + order.total,
                0,
            ),
            orders: undefined, // Remove orders array from response for security
        }));

        return NextResponse.json({
            users: usersWithStats,
            pagination: {
                page,
                limit,
                total: totalCount,
                pages: Math.ceil(totalCount / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 },
        );
    }
}
