import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, role } = await req.json(); // ❗ password-г хасна

    if (!name || !email || !role) {
      return NextResponse.json({ message: "Мэдээлэл дутуу байна" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "Имэйл бүртгэлтэй байна" }, { status: 409 });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role,
        password: "",
      },
    });

    return NextResponse.json({ message: "Амжилттай бүртгэгдлээ", user: newUser });
  } catch (error) {
    console.error("POST /api/user алдаа:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}
