import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
            },
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error('Product fetch error:', error);
    }
}

export async function POST(req: Request) {
    const body = await req.json();

    const { name, categoryId, description, price, stock, imageUrl } = body;

    if (!name || !categoryId || !price || !stock || !imageUrl) {
        return NextResponse.json(
            { error: 'Бүх талбарыг бөглөнө үү' },
            { status: 400 },
        );
    }

    const newProduct = await prisma.product.create({
        data: {
            name,
            description,
            price: Number(price),
            stock: Number(stock),
            imageUrl,
            category: {
                connect: { id: Number(categoryId) },
            },
        },
    });

    return NextResponse.json(newProduct);
}
