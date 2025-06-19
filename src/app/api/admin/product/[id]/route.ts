import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';


export async function PUT(
    request: Request,
    { params }: { params: { id: string } } 
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user?.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 },
            );
        }

        const productId = parseInt(params.id); 
        if (isNaN(productId)) {
            return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
        }

        const body = await request.json(); 
        const { name, description, price, stock, categoryId, images } = body;

        if (!name || !price || !categoryId) {
            return NextResponse.json(
                { error: 'Name, price, and category are required for update' },
                { status: 400 },
            );
        }
        
        await prisma.productImage.deleteMany({
            where: {
                productId: productId,
            },
        });

        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: {
                name,
                description: description || '',
                price: parseFloat(price),
                stock: parseInt(stock) || 0,
                imageUrl: images && images.length > 0 ? images[0] : '', 
                categoryId: parseInt(categoryId),
                images: {
                    create: images && images.length > 0 ? images.map(
                        (url: string, index: number) => ({
                            imageUrl: url,
                            isPrimary: index === 0,
                        })
                    ) : [],
                },
            },
            include: {
                category: true,
                images: true,
            },
        });

        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error: any) {
        console.error(`Error updating product ${params.id}:`, error);
        if (error.code === 'P2025') { 
            return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
        }
        if (error.code === 'P2003') { 
            return NextResponse.json({ error: 'Invalid category ID provided.' }, { status: 400 });
        }
        return NextResponse.json(
            { error: 'Failed to update product', details: error.message },
            { status: 500 },
        );
    }
}


export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user?.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 },
            );
        }

        const productId = parseInt(params.id);
        if (isNaN(productId)) {
            return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
        }

        await prisma.productImage.deleteMany({
            where: {
                productId: productId,
            },
        });

        const deletedProduct = await prisma.product.delete({
            where: { id: productId },
        });

        return NextResponse.json(deletedProduct, { status: 200 });
    } catch (error: any) {
        console.error(`Error deleting product ${params.id}:`, error);
        if (error.code === 'P2025') {
            return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
        }
        return NextResponse.json(
            { error: 'Failed to delete product', details: error.message },
            { status: 500 },
        );
    }
}