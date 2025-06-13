import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET: Бүтээгдэхүүний жагсаалт авах
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user?.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 },
            );
        }

        const products = await prisma.product.findMany({
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
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 },
        );
    }
}

// POST: Шинэ бүтээгдэхүүн нэмэх
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user?.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 },
            );
        }

        const body = await request.json();
        const { name, description, price, stock, categoryId, images } = body;

        if (!name || !price || !categoryId) {
            return NextResponse.json(
                { error: 'Name, price, and category are required' },
                { status: 400 },
            );
        }

        // Create product with primary image URL for backward compatibility
        const primaryImageUrl = images && images.length > 0 ? images[0] : '';

        const product = await prisma.product.create({
            data: {
                name,
                description: description || '',
                price: parseFloat(price),
                stock: parseInt(stock) || 0,
                imageUrl: primaryImageUrl,
                categoryId: parseInt(categoryId),
                // Create product images if provided
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

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 },
        );
    }
}
