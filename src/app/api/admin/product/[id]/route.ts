import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface Params {
    id: string;
}

// GET: Бүтээгдэхүүний дэлгэрэнгүй мэдээлэл авах
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

        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
            include: {
                category: true,
                images: {
                    orderBy: { createdAt: 'asc' },
                },
                _count: {
                    select: {
                        orderItems: true,
                    },
                },
            },
        });

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 },
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json(
            { error: 'Failed to fetch product' },
            { status: 500 },
        );
    }
}

// PUT: Бүтээгдэхүүн засах
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
        const { name, description, price, stock, categoryId, images } = body;

        // Update product with transaction to handle images
        const product = await prisma.$transaction(async (tx) => {
            // Delete existing images
            await tx.productImage.deleteMany({
                where: { productId: parseInt(id) },
            });

            // Update product with primary image URL for backward compatibility
            const primaryImageUrl =
                images && images.length > 0 ? images[0] : '';

            const updatedProduct = await tx.product.update({
                where: { id: parseInt(id) },
                data: {
                    name,
                    description,
                    price: parseFloat(price),
                    stock: parseInt(stock),
                    imageUrl: primaryImageUrl,
                    categoryId: parseInt(categoryId),
                    updatedAt: new Date(),
                    // Create new images
                    images:
                        images && images.length > 0
                            ? {
                                  create: images.map(
                                      (url: string, index: number) => ({
                                          imageUrl: url,
                                          isPrimary: index === 0,
                                      }),
                                  ),
                              }
                            : undefined,
                },
                include: {
                    category: true,
                    images: {
                        orderBy: { createdAt: 'asc' },
                    },
                },
            });

            return updatedProduct;
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json(
            { error: 'Failed to update product' },
            { status: 500 },
        );
    }
}

// DELETE: Бүтээгдэхүүн устгах
export async function DELETE(
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

        await prisma.product.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json(
            { error: 'Failed to delete product' },
            { status: 500 },
        );
    }
}
