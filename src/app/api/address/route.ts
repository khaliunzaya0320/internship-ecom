import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 },
            );
        }

        const addresses = await prisma.address.findMany({
            where: { userId: parseInt(session.user.id) },
            orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
        });

        return NextResponse.json(addresses);
    } catch (error) {
        console.error('Address GET error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 },
            );
        }

        const { title, fullName, phone, address, city, district, isDefault } =
            await req.json();

        if (!title || !fullName || !phone || !address || !city) {
            return NextResponse.json(
                { error: 'Бүх шаардлагатай талбарыг бөглөнө үү' },
                { status: 400 },
            );
        }

        // If this address is set as default, remove default from other addresses
        if (isDefault) {
            await prisma.address.updateMany({
                where: {
                    userId: parseInt(session.user.id),
                    isDefault: true,
                },
                data: { isDefault: false },
            });
        }

        const newAddress = await prisma.address.create({
            data: {
                userId: parseInt(session.user.id),
                title,
                fullName,
                phone,
                address,
                city,
                district: district || null,
                isDefault: Boolean(isDefault),
            },
        });

        return NextResponse.json(newAddress);
    } catch (error) {
        console.error('Address POST error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
