import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET: Get all sliders
export async function GET() {
    try {
        const sliders = await prisma.slider.findMany({
            orderBy: {
                order: 'asc',
            },
        });

        return NextResponse.json(sliders);
    } catch (error) {
        console.error('Error fetching sliders:', error);
        return NextResponse.json(
            { error: 'Failed to fetch sliders' },
            { status: 500 },
        );
    }
}

// POST: Create new slider (Admin only)
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
        const { title, description, imageUrl, linkUrl, isActive, order } = body;

        if (!title || !imageUrl) {
            return NextResponse.json(
                { error: 'Title and image URL are required' },
                { status: 400 },
            );
        }

        const slider = await prisma.slider.create({
            data: {
                title,
                description: description || '',
                imageUrl,
                linkUrl: linkUrl || '',
                isActive: isActive !== undefined ? isActive : true,
                order: order || 0,
            },
        });

        return NextResponse.json(slider, { status: 201 });
    } catch (error) {
        console.error('Error creating slider:', error);
        return NextResponse.json(
            { error: 'Failed to create slider' },
            { status: 500 },
        );
    }
}
