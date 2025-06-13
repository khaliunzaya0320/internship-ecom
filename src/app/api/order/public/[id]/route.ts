import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const orderId = parseInt(id);

        if (isNaN(orderId)) {
            return NextResponse.json(
                { error: 'Буруу захиалгын дугаар' },
                { status: 400 },
            );
        }

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                category: true,
                            },
                        },
                    },
                },
            },
        });

        if (!order) {
            return NextResponse.json(
                { error: 'Захиалга олдсонгүй' },
                { status: 404 },
            );
        }

        // Return order without sensitive user information
        const publicOrder = {
            id: order.id,
            total: order.total,
            status: order.status,
            createdAt: order.createdAt,
            items: order.items.map((item) => ({
                id: item.id,
                quantity: item.quantity,
                price: item.price,
                product: {
                    id: item.product.id,
                    name: item.product.name,
                    imageUrl: item.product.imageUrl,
                    category: item.product.category,
                },
            })),
        };

        return NextResponse.json(publicOrder);
    } catch (error) {
        console.error('Public order fetch error:', error);
        return NextResponse.json({ error: 'Сервэрийн алдаа' }, { status: 500 });
    }
}
