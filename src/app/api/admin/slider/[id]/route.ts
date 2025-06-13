import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface Params {
    id: string;
}

// PUT: Update slider (Admin only)
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
        const { title, description, imageUrl, linkUrl, isActive, order } = body;

        const slider = await prisma.slider.update({
            where: { id: parseInt(id) },
            data: {
                title,
                description,
                imageUrl,
                linkUrl,
                isActive,
                order,
                updatedAt: new Date(),
            },
        });

        return NextResponse.json(slider);
    } catch (error) {
        console.error('Error updating slider:', error);
        return NextResponse.json(
            { error: 'Failed to update slider' },
            { status: 500 },
        );
    }
}

// DELETE: Delete slider (Admin only)
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

        await prisma.slider.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: 'Slider deleted successfully' });
    } catch (error) {
        console.error('Error deleting slider:', error);
        return NextResponse.json(
            { error: 'Failed to delete slider' },
            { status: 500 },
        );
    }
}
