import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const cartitem = await prisma.cartitem.findMany();
  return NextResponse.json(cartitem);
}