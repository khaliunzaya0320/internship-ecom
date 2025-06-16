import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
    id: string;
}

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
    const { id } = await params;
    const categoryId = Number(id);

    const products = await prisma.product.findMany({
        where: { categoryId },
        include: { category: true },
    });

    return NextResponse.json(products);
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id: paramId } = await params;
    const id = Number(paramId);
    const { name } = await req.json();
    if (typeof name !== 'string' || !name.trim())
        return NextResponse.json({ error: 'Invalid' }, { status: 400 });
    const cat = await prisma.category.update({ where: { id }, data: { name } });
    return NextResponse.json(cat);
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id: paramId } = await params;
    const id = Number(paramId);
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true });
}
