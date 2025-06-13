import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
    const notification = await prisma.notification.findMany();
    return NextResponse.json(notification);
}
