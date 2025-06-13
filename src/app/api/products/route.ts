import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // Pagination parameters
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');
        const skip = (page - 1) * limit;

        // Filter parameters
        const categoryId = searchParams.get('categoryId');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const inStock = searchParams.get('inStock');
        const search = searchParams.get('search');

        // Sort parameters
        const sortBy = searchParams.get('sortBy') || 'createdAt';
        const sortOrder = searchParams.get('sortOrder') || 'desc';

        // Build where clause
        const where: any = {};

        if (categoryId) {
            where.categoryId = parseInt(categoryId);
        }

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price.gte = parseFloat(minPrice);
            if (maxPrice) where.price.lte = parseFloat(maxPrice);
        }

        if (inStock === 'true') {
            where.stock = { gt: 0 };
        }

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }

        // Build orderBy clause
        let orderBy: any = {};

        switch (sortBy) {
            case 'name':
                orderBy.name = sortOrder;
                break;
            case 'price':
                orderBy.price = sortOrder;
                break;
            case 'createdAt':
                orderBy.createdAt = sortOrder;
                break;
            default:
                orderBy.createdAt = 'desc';
        }

        // Fetch products with pagination
        const [products, totalCount] = await Promise.all([
            prisma.product.findMany({
                where,
                include: {
                    category: true,
                    images: {
                        orderBy: { createdAt: 'asc' },
                        take: 1,
                    },
                },
                orderBy,
                skip,
                take: limit,
            }),
            prisma.product.count({ where }),
        ]);

        // Format products to include primary image
        const formattedProducts = products.map((product) => ({
            ...product,
            imageUrl: product.images[0]?.imageUrl || '/placeholder.jpg',
        }));

        const hasMore = skip + limit < totalCount;
        const totalPages = Math.ceil(totalCount / limit);

        return NextResponse.json({
            products: formattedProducts,
            pagination: {
                currentPage: page,
                totalPages,
                totalCount,
                hasMore,
                limit,
            },
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { message: 'Error fetching products' },
            { status: 500 },
        );
    }
}
