import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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

    const products = wishlist.map((item) => item.product);

    return NextResponse.json(products);
  } catch (error) {
    console.error("Wishlist fetch error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
