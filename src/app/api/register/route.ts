import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Бүх талбарыг бөглөнө үү' },
                { status: 400 },
            );
        }

        // Email давхардсан эсэх шалгах
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'Энэ имэйл хаяг аль хэдийн бүртгэгдсэн байна' },
                { status: 400 },
            );
        }

        // Нууц үг encrypt хийх
        const hashedPassword = await bcrypt.hash(password, 12);

        // Хэрэглэгч үүсгэх
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'USER',
            },
        });

        return NextResponse.json(
            { message: 'Амжилттай бүртгэгдлээ', userId: user.id },
            { status: 201 },
        );
    } catch (error) {
        console.error('Register error:', error);
        return NextResponse.json({ error: 'Серверийн алдаа' }, { status: 500 });
    }
}
