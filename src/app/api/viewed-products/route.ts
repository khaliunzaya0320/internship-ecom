import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    const viewedProducts = await prisma.viewedProduct.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            category: true
          }
        }
      },
      orderBy: { viewedAt: 'desc' },
      take: 20 // Limit to 20 recent items
    });

    return NextResponse.json(viewedProducts);
  } catch (error) {
    console.error("Viewed products GET error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const userId = parseInt(session.user.id);

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Use upsert to either create or update the viewed time
    const viewedProduct = await prisma.viewedProduct.upsert({
      where: {
        userId_productId: {
          userId,
          productId
        }
      },
      update: {
        viewedAt: new Date()
      },
      create: {
        userId,
        productId,
        viewedAt: new Date()
      }
    });

    return NextResponse.json(viewedProduct);
  } catch (error) {
    console.error("Viewed products POST error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
