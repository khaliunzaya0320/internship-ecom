import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 },
            );
        }

        const { currentPassword, newPassword } = await req.json();

        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { error: 'Хуучин болон шинэ нууц үг заавал шаардлагатай' },
                { status: 400 },
            );
        }

        if (newPassword.length < 6) {
            return NextResponse.json(
                { error: 'Шинэ нууц үг дор хаяж 6 тэмдэгт байх ёстой' },
                { status: 400 },
            );
        }

        // Get current user with password
        const user = await prisma.user.findUnique({
            where: { id: parseInt(session.user.id) },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 },
            );
        }

        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(
            currentPassword,
            user.password,
        );
        if (!isCurrentPasswordValid) {
            return NextResponse.json(
                { error: 'Хуучин нууц үг буруу байна' },
                { status: 400 },
            );
        }

        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);

        // Update password
        await prisma.user.update({
            where: { id: parseInt(session.user.id) },
            data: { password: hashedNewPassword },
        });

        return NextResponse.json({ message: 'Нууц үг амжилттай солигдлоо' });
    } catch (error) {
        console.error('Change password error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
