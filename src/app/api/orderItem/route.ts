import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
    const orderitem = await prisma.orderItem.findMany();
    return NextResponse.json(orderitem);
}
