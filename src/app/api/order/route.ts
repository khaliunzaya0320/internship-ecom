export const runtime = "nodejs";
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {

    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: { name: true }
        },
        items: {
          include: {
            product: {
              select: { name: true }
            }
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    const formattedOrders = orders.map(order => ({
      id: order.id,
      userId: order.userId,
      user: order.user.name,
      items: order.items.map(item => `${item.product.name} x${item.quantity}`),
      total: order.total,
      status: order.status,
      createdAt: order.createdAt
    }));

    return NextResponse.json(formattedOrders);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching orders" }, { status: 500 });
  }
}
