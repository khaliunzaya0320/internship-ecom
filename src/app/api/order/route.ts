export const runtime = 'nodejs'; 
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const order = await prisma.order.findMany();
  return NextResponse.json(order);
}
