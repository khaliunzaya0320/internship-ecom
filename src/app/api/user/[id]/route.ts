import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function PUT(
    req: NextRequest,
    context: { params: { id: string } },
) {
    const userId = Number(context.params.id);
    const { role } = await req.json();

    if (!['USER', 'ADMIN'].includes(role)) {
        return new NextResponse('Invalid', { status: 400 });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { role },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('PUT /api/user/[id] алдаа:', error);
    }
}

export async function DELETE(
    req: NextRequest,
    context: { params: { id: string } },
) {
    const userId = Number(context.params.id);

    try {
        await prisma.user.delete({
            where: { id: userId },
        });

        return new NextResponse(JSON.stringify({ message: 'User deleted' }), {
            status: 200,
        });
    } catch (error) {
        console.error('DELETE /api/user/[id] алдаа:', error);
    }
}
