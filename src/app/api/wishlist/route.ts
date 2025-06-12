import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const wishlist = await prisma.wishlist.findMany();
  return NextResponse.json(wishlist);
}