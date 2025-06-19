import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
    const orders = await prisma.order.findMany({
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return NextResponse.json(orders);
}


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId: rawUserId, cartProducts } = body;

        const userId = parseInt(rawUserId, 10);
        if (isNaN(userId)) {
            return NextResponse.json({ message: 'Хэрэглэгчийн ID буруу байна.', error: 'Invalid User ID' }, { status: 400 });
        }

        if (!cartProducts || cartProducts.length === 0) {
            return NextResponse.json({ message: 'Захиалах бараа байхгүй байна.', error: 'Empty Cart' }, { status: 400 });
        }

        let totalAmount = 0;
        const orderItemsData = [];

        for (const item of cartProducts) {
            const productId = parseInt(item.productId, 10);
            if (isNaN(productId)) {
                return NextResponse.json({ message: `Барааны ID буруу байна: ${item.productId}`, error: 'Invalid Product ID' }, { status: 400 });
            }

            const product = await prisma.product.findUnique({
                where: { id: productId }
            });

            if (!product) {
                return NextResponse.json({ message: `Бараа олдсонгүй: ${item.productId}`, error: 'Product Not Found' }, { status: 404 });
            }

            orderItemsData.push({
                productId: productId,
                quantity: item.quantity,
                price: product.price,
            });
            totalAmount += product.price * item.quantity;
        }

        const order = await prisma.order.create({
            data: {
                userId: userId, 
                total: totalAmount,
                status: 'PENDING',
                items: {
                    create: orderItemsData,
                },
            },
            include: {
                items: true,
            },
        });

        return NextResponse.json(order, { status: 201 });
    } catch (error: any) {
        console.error('Order creation error:', error);
        if (error.code === 'P2025') {
            return NextResponse.json({ message: 'Хэрэглэгч эсвэл зарим бараа олдсонгүй.', details: error.message }, { status: 404 });
        }
        return NextResponse.json({ message: 'Захиалга үүсгэхэд алдаа гарлаа.', details: error.message || 'Үл мэдэгдэх алдаа' }, { status: 500 });
    }
}