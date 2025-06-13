import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const featuredCategories = await prisma.category.findMany({
            where: {
                featured: true,
            },
            orderBy: {
                name: 'asc',
            },
            include: {
                _count: {
                    select: {
                        products: true,
                    },
                },
            },
        });

        return NextResponse.json(featuredCategories);
    } catch (error) {
        console.error('Error fetching featured categories:', error);
        return NextResponse.json(
            { message: 'Error fetching featured categories' },
            { status: 500 },
        );
    }
}
