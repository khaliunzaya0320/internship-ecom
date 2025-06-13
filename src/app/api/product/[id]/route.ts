import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const productId = parseInt(id);
        const product = await prisma.product.findUnique({
            where: { id: productId },
            include: {
                category: true,
                images: {
                    orderBy: { createdAt: 'asc' },
                },
            },
        });

        if (!product) {
            return NextResponse.json(
                { error: 'Бүтээгдэхүүн олдсонгүй' },
                { status: 404 },
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error('Product GET error:', error);
        return NextResponse.json(
            { error: 'Бүтээгдэхүүн татахад алдаа гарлаа' },
            { status: 500 },
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } },
) {
    try {
        const id = parseInt(params.id);
        const data = await request.json();

        const product = await prisma.product.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                // image: data.image,
                categoryId: parseInt(data.categoryId),
                stock: parseInt(data.stock),
            },
            include: { category: true },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('Product update error:', error);
        return NextResponse.json(
            { error: 'Бүтээгдэхүүн шинэчлэхэд алдаа гарлаа' },
            { status: 500 },
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } },
) {
    try {
        const id = parseInt(params.id);

        await prisma.product.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Амжилттай устгагдлаа' });
    } catch (error) {
        console.error('Product delete error:', error);
        return NextResponse.json(
            { error: 'Бүтээгдэхүүн устгахад алдаа гарлаа' },
            { status: 500 },
        );
    }
}
