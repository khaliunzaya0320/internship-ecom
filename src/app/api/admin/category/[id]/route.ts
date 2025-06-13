import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface Params {
    id: string;
}

// GET: Ангиллын дэлгэрэнгүй мэдээлэл авах
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

        const category = await prisma.category.findUnique({
            where: { id: parseInt(id) },
            include: {
                _count: {
                    select: {
                        products: true,
                    },
                },
            },
        });

        if (!category) {
            return NextResponse.json(
                { error: 'Category not found' },
                { status: 404 },
            );
        }

        return NextResponse.json(category);
    } catch (error) {
        console.error('Error fetching category:', error);
        return NextResponse.json(
            { error: 'Failed to fetch category' },
            { status: 500 },
        );
    }
}

// PUT: Ангилал засах
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
        const { name, description, imageUrl, featured } = body;

        const category = await prisma.category.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                imageUrl,
                featured,
            },
        });

        return NextResponse.json(category);
    } catch (error) {
        console.error('Error updating category:', error);
        return NextResponse.json(
            { error: 'Failed to update category' },
            { status: 500 },
        );
    }
}

// DELETE: Ангилал устгах
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

        // Энэ ангилалд хамаарах бүтээгдэхүүн байгаа эсэхийг шалгах
        const productCount = await prisma.product.count({
            where: { categoryId: parseInt(id) },
        });

        if (productCount > 0) {
            return NextResponse.json(
                { error: 'Cannot delete category with existing products' },
                { status: 400 },
            );
        }

        await prisma.category.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        return NextResponse.json(
            { error: 'Failed to delete category' },
            { status: 500 },
        );
    }
}
