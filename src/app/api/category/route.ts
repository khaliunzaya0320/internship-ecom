import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const category = await prisma.category.findMany();
  return NextResponse.json(category);
}

export async function POST(req: NextRequest) {
  const { name } = await req.json()
  if (!name || typeof name !== 'string') {
    return NextResponse.json({ error: 'Invalid name' }, { status: 400 })
  }
  
  const newCategory = await prisma.category.create({ data: { name } })
  return NextResponse.json(newCategory, { status: 201 })
}

