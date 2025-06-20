import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
    const cartitem = await prisma.cartItem.findMany();
    return NextResponse.json(cartitem);
}
