import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { status } = await req.json();
        const { id: paramId } = await params;
        const id = parseInt(paramId);

        const updated = await prisma.order.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error(error);
        return new NextResponse('PUT error', { status: 500 });
    }
}
