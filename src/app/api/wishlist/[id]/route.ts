import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ message: 'Wishlist item ID is required' }, { status: 400 });
    }

    try {
        const deletedItem = await prisma.wishlist.delete({
            where: {
                id: parseInt(id), 
            },
        });
        return NextResponse.json(deletedItem, { status: 200 });
    } catch (error: any) { 
        console.error(`Error deleting wishlist item ${id}:`, error);
        if (error.code === 'P2025') { 
            return NextResponse.json({ message: 'Wishlist item not found.' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Failed to delete wishlist item.', error: error.message }, { status: 500 });
    }
}
