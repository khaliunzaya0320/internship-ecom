import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'public/uploads');

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


export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { name, description, price, stock, categoryId, images } = body;

        if (!name || !price || !stock || !categoryId || !images || !Array.isArray(images) || images.length === 0) {
            return NextResponse.json({ error: 'Бүх шаардлагатай талбарыг бөглөнө үү, мөн дор хаяж нэг зураг оруулна уу.' }, { status: 400 });
        }

        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price), 
                stock: parseInt(stock),   
                categoryId: parseInt(categoryId), 
                images: {
                    create: images.map((imageUrl: string) => ({
                        imageUrl: imageUrl,
                    })),
                },
                imageUrl: images[0], 
            },
            include: {
                images: true, 
                category: true,
            }
        });

        return NextResponse.json(newProduct, { status: 201 }); 
    } catch (error) {
        console.error('Бүтээгдэхүүн нэмэхэд алдаа гарлаа:', error);
        return NextResponse.json(
            { error: 'Бүтээгдэхүүн нэмэхэд алдаа гарлаа', details: error instanceof Error ? error.message : 'алдаа' },
            { status: 500 }
        );
    }
}