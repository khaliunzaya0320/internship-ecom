import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const wishlist = await prisma.wishlist.findMany({
            include: {
                product: {
                    include: {
                        category: true,
                    },
                },
            },
        });
        return NextResponse.json(wishlist);
    } catch (error) {
        console.error('Wishlist fetch error:', error);
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const productId = parseInt(body.productId, 10);
        const userId = parseInt(body.userId, 10);

        if (!productId || !userId) {
            return NextResponse.json({ error: 'Missing productId or userId' }, { status: 400 });
        }

        const newItem = await prisma.wishlist.create({
            data: {
                product: {
                    connect: { id: productId }, 
                },
                user: {
                    connect: { id: userId },     
                },
            },
        });
        return NextResponse.json(newItem);
    } catch (error: any) {
        console.error('Wishlist add error:', error); 
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'Item already in wishlist.' }, { status: 409 });
        }
        if (error.code === 'P2025') {
            return NextResponse.json({ error: 'Product or user not found.' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Failed to add to wishlist', details: error.message }, { status: 500 });
    }
}