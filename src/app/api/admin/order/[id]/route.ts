import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface Params {
    id: string;
}

// PUT: Захиалгын төлөв өөрчлөх
export async function PUT(
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

        const body = await request.json();
        const { status } = body;

        if (
            !['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].includes(status)
        ) {
            return NextResponse.json(
                { error: 'Invalid status' },
                { status: 400 },
            );
        }

        const order = await prisma.order.update({
            where: { id: parseInt(id) },
            data: { status },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        // Мэдэгдэл үүсгэх (энд notification API-руу илгээх эсвэл өөр логик хийж болно)
        // await createNotification(order.userId, `Таны захиалга ${order.id}-ийн төлөв ${status} болж өөрчлөгдлөө.`);

        return NextResponse.json(order);
    } catch (error) {
        console.error('Error updating order status:', error);
        return NextResponse.json(
            { error: 'Failed to update order status' },
            { status: 500 },
        );
    }
}
