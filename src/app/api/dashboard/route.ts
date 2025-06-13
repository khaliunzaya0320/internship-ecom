import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardStats } from "@/types";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    // Get dashboard statistics
    const [
      totalOrders,
      totalSpent,
      wishlistCount,
      viewedProductsCount,
      recentOrders,
    ] = await Promise.all([
      // Total orders count
      prisma.order.count({
        where: { userId },
      }),

      // Total spent amount
      prisma.order.aggregate({
        where: { userId },
        _sum: { total: true },
      }),

      // Wishlist count
      prisma.wishlist.count({
        where: { userId },
      }),

      // Viewed products count
      prisma.viewedProduct.count({
        where: { userId },
      }),

      // Recent orders (last 5)
      prisma.order.findMany({
        where: { userId },
        include: {
          items: {
            include: {
              product: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    const dashboardStats: DashboardStats = {
      totalOrders,
      totalSpent: totalSpent._sum.total || 0,
      wishlistCount,
      viewedProductsCount,
      recentOrders,
    };

    return NextResponse.json(dashboardStats);
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
